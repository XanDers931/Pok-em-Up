import View from './View.js';
import Background from './inGame/BackgroundDisplay.js';
import Player from './inGame/PlayerDisplay.js';
import Ennemy from '../modele/inGame/Ennemy.js';
import Router from './Router.js';
import Draw from './Draw.js';
import BaseValue from './BaseValue.js';
import DamageArea from '../modele/inGame/DamageArea.js';

export default class GameView extends View {
	start;
	canvas;
	context;
	background;
	players;
	ennemies;
	socket;
	damageAreaList;
	refresh;

	constructor(element, socket) {
		super(element);
		this.start = false;
		this.socket = socket;
		this.players = [];
		this.ennemies = [];
		this.socket.on('newPlayer', players => {
			this.players = [];
			players.forEach(player => {
				this.players.push(new Player(1, player.socketId, player.x, player.y));
			});
		});
		this.socket.on('leftPlayer', socketId => {
			this.players = this.players.filter(player => player.socketId != socketId);
		});
	}

	show() {
		super.show();
		this.socket.emit('bg', true);
		if (this.start == false) {
			this.start = true;

			this.canvas = this.element.querySelector('.gameCanvas');
			this.context = this.canvas.getContext('2d');
			Draw.initialise(this.canvas);
			BaseValue.initialise(1920, 1080, 1000 / 60, 1000, 98, 128);

			this.background = new Background();
			this.socket.on('bgPosition', data => {
				this.background.setX(data);
			});
			// Player argument 1 : skin id
			//this.players.push(new Player(1));
			this.socket.on('playerPosition', data => {
				for (let index = 0; index < data.length; index++) {
					this.players[index].setX(data[index][0]);
					this.players[index].setY(data[index][1]);
				}
			});

			setInterval(event => this.spawnEnnemy(), BaseValue.spawnRate);

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
		//console.log(ennemy.getX());
		this.damageAreaList = [];
		this.damageAreaList.push(
			new DamageArea(
				ennemy.getX(),
				ennemy.getY(),
				ennemy.getEnnemyWidth(),
				ennemy.getEnnemyHeight()
			)
		);
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
			}, 200);
		}

		if (this.background.getReady()) {
			this.background.display();
		}
		this.players.forEach(player => {
			if (player.getReady()) {
				player.display();
			}
		});

		/*
		this.player.projectiles.forEach(element => {
			if (element.getReady()) {
				element.display();
			}
		});
		*/
		this.ennemies.forEach(element => {
			if (element.getReady()) {
				element.display();
			}
		});

		this.ennemies.forEach(element => {
			if (element.isOutCanva()) {
				this.ennemies.splice(0, 1);
			}
		});

		this.context.stroke();
		requestAnimationFrame(event => this.render(event));
	}

	//Créer un ennemi
	spawnEnnemy() {
		this.ennemies.push(
			new Ennemy(
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',
				3,
				15
			)
		);
	}
}
