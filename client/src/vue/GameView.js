import View from './View.js';
import BackgroundDisplay from './inGame/BackgroundDisplay.js';
import PlayerDisplay from './inGame/PlayerDisplay.js';
import ProjectileDisplay from './inGame/ProjectileDisplay.js';
import Ennemy from '../modele/inGame/Ennemy.js';
import Router from './Router.js';
import Draw from './Draw.js';
import BaseValue from './BaseValue.js';
import DamageArea from '../modele/inGame/DamageArea.js';
import Data from '../modele/inGame/Data.js';
import BonusDisplay from './inGame/BonusDisplay.js';

export default class GameView extends View {
	start;
	socket;
	canvas;
	context;
	background;
	players;
	ennemies;
	socket;
	damageAreaList;
	refresh;
	audio;
	idEnnemiesList;
	playerName;

	constructor(element, socket) {
		super(element);
		this.start = false;
		this.socket = socket;
		this.players = [];
		this.ennemies = [];
		this.idEnnemiesList = [];
		this.bonus = [];
		this.addIdEnnemiesList();

		this.socket.on('newPlayer', players => {
			this.players = [];

			players.forEach(player => {
				this.players.push(
					new PlayerDisplay(1, player.socketId, player.x, player.y, player.name)
				);
			});
		});
		this.socket.on('leftPlayer', socketId => {
			this.players = this.players.filter(player => player.socketId != socketId);
		});
	}

	show() {
		super.show();
		this.socket.emit('bg', true);
		const pseudo = prompt('Votre pseudo');
		this.socket.emit('pseudo', pseudo);
		this.players[this.players.length - 1].name = pseudo;
		if (this.start == false) {
			this.start = true;

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

			this.background = new BackgroundDisplay();
			this.socket.on('bgPosition', data => {
				this.background.setX(data);
			});
			this.socket.on('playerPosition', data => {
				for (let index = 0; index < data.length; index++) {
					this.players[index].setX(data[index][0]);
					this.players[index].setY(data[index][1]);
				}
			});
			this.socket.on('projectilePosition', data => {
				for (let index = 0; index < data.length; index++) {
					this.players[index].projectiles = [];
					data[index].forEach(projectile => {
						this.players[index].projectiles.push(
							new ProjectileDisplay(projectile.x, projectile.y)
						);
					});
				}
			});
			this.socket.on('bonusPosition'),
				data => {
					for (let index = 0; index < data.length; index++) {
						this.bonus[index].setX(data[index][0]);
						this.bonus[index].setY(data[index][1]);
					}
				};

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

			this.socket.on('newBonus', bonus => {
				this.bonus = [];
				bonus.forEach(element => {
					this.bonus.push(new BonusDisplay(bonus.x, bonus.y));
				});
			});
			this.socket.on('leftBonus', id => {
				this.bonus = this.bonus.filter(element => element.id != id);
			});

			this.refresh = true;

			setInterval(event => this.spawnEnnemy(), BaseValue.spawnRate);

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
		if (event.key == 'Escape') {
			Router.navigate('/');
			this.socket.emit('bg', false);
		} else {
			this.socket.emit('keyDown', event.code);
		}
	}

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

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.refresh) {
			this.damageAreaList = this.collisionMaj(this.ennemies);
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

		this.ennemies.forEach(element => {
			if (element.isOutCanva()) {
				let index = this.ennemies.indexOf(element);
				this.ennemies.splice(index, 1);
			}
		});

		Draw.drawScore(10, 2);

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

	addIdEnnemiesList() {
		Data.forEach(element => this.idEnnemiesList.push(element));
	}

	//Créer un ennemi
	spawnEnnemy() {
		this.ennemies.push(
			new Ennemy(
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
					this.idEnnemiesList[
						Math.floor(Math.random() * this.idEnnemiesList.length + 1)
					] +
					'.png',
				3,
				15
			)
		);
	}
}
