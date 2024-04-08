import View from './View.js';
import BackgroundDisplay from './inGame/BackgroundDisplay.js';
import PlayerDisplay from './inGame/PlayerDisplay.js';
import ProjectileDisplay from './inGame/ProjectileDisplay.js';
import EnnemyDisplay from './inGame/EnnemyDisplay.js';
import Router from './Router.js';
import Draw from './Draw.js';
import BaseValue from './BaseValue.js';
import DamageArea from '../modele/inGame/DamageArea.js';
import BonusDisplay from './inGame/BonusDisplay.js';

/**
 * GameView, the view use to play the game client side
 * many information needed to play like the players or
 * the ennemies.
 */
export default class GameView extends View {
	start;
	socket;
	canvas;
	context;
	audio;
	background;
	players;
	ennemies;
	damageAreaList;
	refresh;
	playerName;
	bonus;
	time;

	constructor(element, socket) {
		super(element);
		this.start = false;
		this.socket = socket;
		this.background = new BackgroundDisplay();
		this.players = [];
		this.ennemies = [];
		this.bonus = [];
		this.time;

		this.socket.on('newPlayer', players => {
			this.players = [];

			players.forEach(player => {
				this.players.push(
					new PlayerDisplay(
						player.skinId,
						player.socketId,
						player.x,
						player.y,
						player.name
					)
				);
			});
		});
		this.socket.on('initEnnemies', ennemies => {
			ennemies.forEach(ennemy => {
				this.ennemies.push(
					new EnnemyDisplay(
						ennemy.x,
						ennemy.y,
						'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
							ennemy.idImage +
							'.png',
						ennemy.id
					)
				);
			});
		});
		this.socket.on('ennemySpawn', data => {
			this.ennemies.push(
				new EnnemyDisplay(
					data.x,
					data.y,
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
						data.idImage +
						'.png',
					data.id
				)
			);
		});
		this.socket.on('ennemyRecycle', data => {
			this.ennemies.splice(0, 1);
		});
		this.socket.on('newBonus', bonus => {
			this.bonus = [];
			bonus.forEach(element => {
				this.bonus.push(new BonusDisplay(element.id, element.x, element.y));
			});
		});
		this.socket.on('leftBonus', id => {
			this.bonus = this.bonus.filter(element => element.id != id);
		});
		this.socket.on('updatePositions', data => {
			this.background.setX(data.bg);
			for (let index = 0; index < data.players.length; index++) {
				this.players[index].setX(data.players[index][0]);
				this.players[index].setY(data.players[index][1]);
			}
			for (let index = 0; index < data.projectiles.length; index++) {
				this.players[index].projectiles = [];
				data.projectiles[index].forEach(projectile => {
					this.players[index].projectiles.push(
						new ProjectileDisplay(projectile.x, projectile.y)
					);
				});
			}
			for (let index = 0; index < data.ennemies.length; index++) {
				this.ennemies[index].setX(data.ennemies[index].x);
				this.ennemies[index].setY(data.ennemies[index].y);
			}
			for (let index = 0; index < data.bonus.length; index++) {
				this.bonus[index].setX(data.bonus[index].x);
				this.bonus[index].setY(data.bonus[index].y);
			}
		});
		this.socket.on('leftPlayer', socketId => {
			this.players = this.players.filter(player => player.socketId != socketId);
		});
		this.socket.on('restart', element => {
			this.start = false;
			this.background = new BackgroundDisplay();
			this.players = [];
			this.ennemies = [];
			this.bonus = [];
		});

		this.socket.on('ennemyDispawn', ennemyUpdate => {
			const ennemyToDelete = this.ennemies.find(
				ennemy => ennemy.id == ennemyUpdate.id
			);
			const index = this.ennemies.indexOf(ennemyToDelete);
			this.ennemies.splice(index, 1);
		});

		this.socket.on('ennemyHit', ennemy => {
			let index = this.ennemies.indexOf(ennemy);
			this.ennemies.splice(index, 1);
		});

		this.socket.on('reduceLife', player => {
			Router.navigate('/gameover');
		});

		this.socket.on('bonusTaken', plus => {
			const bonusToDelete = this.bonus.find(bonus => bonus.id == plus.id);
			const index = this.bonus.indexOf(bonusToDelete);
			this.bonus.splice(index, 1);
		});

		this.socket.on('timeUpdate', newTime => {
			this.time = newTime;
			console.log(this.time);
		});
	}

	/**
	 * Initialize the game
	 */
	show() {
		super.show();
		if (this.start == true) {
			this.socket.emit('restartGame');
		}
		if (this.start == false) {
			this.start = true;

			let pseudo = '';
			while (pseudo == null || pseudo == '' || pseudo.length > 8) {
				pseudo = prompt('Votre pseudo (1-8 caractères) : ');
			}
			this.socket.emit('pseudo', pseudo);

			if (this.players.length == 1) {
				let difficulty = 0;
				while (difficulty != 1 && difficulty != 2 && difficulty != 3) {
					difficulty = prompt(
						'Choix de la difficulté : facile (1), normal (2), difficile (3)'
					);
				}
				this.socket.emit('difficulty', difficulty);
			}

			this.socket.emit('game', true);
			this.players[this.players.length - 1].name = pseudo;

			this.canvas = this.element.querySelector('.gameCanvas');
			this.context = this.canvas.getContext('2d');
			Draw.initialise(this.canvas);
			BaseValue.initialise(
				1920,
				1080,
				1000 / 60,
				1000,
				48,
				64,
				1000 / 30,
				30,
				10,
				64,
				64,
				96,
				96
			);

			this.refresh = true;

			this.audio = document.querySelector('.mainTheme');
			this.audio.play();

			requestAnimationFrame(event => this.render(event));

			document.addEventListener('keyup', event =>
				this.socket.emit('keyUp', event.code)
			);
			document.addEventListener('keydown', event => this.handleKeyDown(event));
		}
	}

	/**
	 * Stop the game (only in single player mode)
	 * @param {*} event
	 */
	handleKeyDown(event) {
		if (event.key == 'Escape' && this.players.length == 1) {
			this.socket.emit('game', false);
			Router.navigate('/pause');
		} else {
			this.socket.emit('keyDown', event.code);
		}
	}

	/**
	 * Do the display for the canvas each requestAnimationFrame
	 */
	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.refresh) {
			this.refresh = false;
			setTimeout(() => {
				this.refresh = true;
			}, BaseValue.hitboxCheckRate);
		}

		if (this.background.getReady()) {
			this.background.display();
		}
		this.players.forEach(player => {
			if (player.getReady()) {
				player.display();
			}
			//Draw.drawScore(player.getEnnemiesKilled(), 2);
		});

		this.players.forEach(player => {
			player.projectiles.forEach(projectile => {
				if (projectile.getReady()) {
					projectile.display();
				}
			});
		});

		this.ennemies.forEach(element => {
			if (element.getReady()) {
				element.display();
			}
		});

		this.bonus.forEach(element => {
			if (element.getReady()) {
				element.display();
			}
		});

		this.context.stroke();
		requestAnimationFrame(event => this.render(event));
	}
}
