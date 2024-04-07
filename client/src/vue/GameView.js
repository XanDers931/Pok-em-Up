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

	constructor(element, socket) {
		super(element);
		this.start = false;
		this.socket = socket;
		this.background = new BackgroundDisplay();
		this.players = [];
		this.ennemies = [];
		this.bonus = [];

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
							'.png'
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
						'.png'
				)
			);
		});
		this.socket.on('ennemyRecycle', data => {
			this.ennemies.splice(0, 1);
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

		this.socket.on('ennemyKillPlayer', ennemy =>{
			let index = this.ennemies.indexOf(ennemy);
			this.ennemies.splice(index, 1);
		})

		this.socket.on('ennemyHit', ennemy => {
			let index = this.ennemies.indexOf(ennemy);
			this.ennemies.splice(index, 1);
		});
	}

	show() {
		super.show();
		if (this.start == false) {
			this.start = true;

			let pseudo = '';
			while (pseudo == null || pseudo == '') {
				pseudo = prompt('Votre pseudo');
			}
			this.socket.emit('pseudo', pseudo);

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
				64
			);

			/*
			this.damageAreaList = [];
			this.ennemies.forEach(element => {
				this.damageAreaList.push(
					new damageArea(
						element.getId(),
						element.getX(),
						element.getY(),
						element.getEnnemyWidth(),
						element.getEnnemyHeight()
					)
				);
			});
			*/

			this.socket.on('newBonus', bonus => {
				this.bonus = [];
				bonus.forEach(element => {
					this.bonus.push(new BonusDisplay(element.id, element.x, element.y));
				});
			});
			this.socket.on('leftBonus', id => {
				this.bonus = this.bonus.filter(element => element.id != id);
			});

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

	handleKeyDown(event) {
		if (event.key == 'Escape' && this.players.length == 1) {
			this.socket.emit('game', false);
			Router.navigate('/pause');
		} else {
			this.socket.emit('keyDown', event.code);
		}
	}

	/*
	collisionMaj(ennemy) {
		this.damageAreaList = [];
		this.ennemies.forEach(element => {
			this.damageAreaList.push(
				new DamageArea(
					element.getX(),
					element.getY(),
					element.getEnnemyWidth(),
					element.getEnnemyHeight()
				)
			);
		});
		return this.damageAreaList;
	}
	*/

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.refresh) {
			/*
			this.damageAreaList = this.collisionMaj(this.ennemies);
			*/
			this.refresh = false;
			//this.player.detectsCollision(this.damageAreaList);
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
			//player.deleteHitProjectiles(this.damageAreaList);
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

		/*
		this.context.font = '48px serif';
		this.context.fillText('Hello world', 10, 50);

		/* Il faut laisser le code commenté pour visualiser les hitsbox
		this.damageAreaList.forEach(element => {
			if (element.getReady()) {
				element.display();
			}
		});
		*/

		this.context.stroke();
		requestAnimationFrame(event => this.render(event));
	}
}
