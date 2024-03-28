import View from './View.js';
import Background from './inGame/Background.js';
import Player from '../modele/inGame/Player.js';
import Ennemy from '../modele/inGame/Ennemy.js';
import Router from './Router.js';
import Draw from './Draw.js';
import BaseValue from './BaseValue.js';
import DamageArea from '../modele/inGame/DamageArea.js';

export default class GameView extends View {
	start;
	socket;
	canvas;
	context;
	background;
	player;
	ennemy = [];
	damageAreaList;
	refresh;
	audio;

	constructor(element, socket) {
		super(element);
		this.start = false;
		this.socket = socket;
	}

	show() {
		super.show();
		this.socket.emit('bg', true);
		if (this.start == false) {
			this.start = true;

			this.canvas = this.element.querySelector('.gameCanvas');
			this.context = this.canvas.getContext('2d');
			Draw.initialise(this.canvas);
			BaseValue.initialise(1920, 1080, 1000 / 60, 1000, 1000 / 30);

			this.background = new Background();
			this.socket.on('bgPosition', data => {
				this.background.setX(data);
			});
			// Player argument 1 : skin id
			this.player = new Player(1);

			this.damageAreaList = [];
			this.ennemy.forEach(element => {
				this.damageAreaList.push(
					new damageArea(
						element.getX(),
						element.getY(),
						element.getEnnemyWidth(),
						element.getEnnemyHeight()
					)
				);
			});

			this.refresh = true;

			setInterval(event => this.spawnEnnemy(), 5000);
			//BaseValue.spawnRate;

			this.audio = document.querySelector('.mainTheme');
			this.audio.play();

			requestAnimationFrame(event => this.render(event));

			document.addEventListener('keydown', event =>
				this.handleEscapePause(event)
			);
		}
	}

	handleEscapePause(event) {
		if (event.key == 'Escape') {
			Router.navigate('/');
			this.socket.emit('bg', false);
		}
	}

	collisionMaj(ennemy) {
		this.damageAreaList = [];
		this.ennemy.forEach(element => {
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
			this.damageAreaList = this.collisionMaj(this.ennemy);
			this.refresh = false;
			this.player.detectsCollision(this.damageAreaList);
			setTimeout(() => {
				this.refresh = true;
			}, BaseValue.hitboxCheckRate);
		}

		if (this.background.getReady()) {
			this.background.display();
		}

		if (this.player.getReady()) {
			this.player.display();
		}

		this.player.projectile.forEach(element => {
			if (element.getReady()) {
				element.display();
			}
		});

		this.ennemy.forEach(element => {
			if (element.getReady()) {
				element.display();
			}
		});

		this.ennemy.forEach(element => {
			if (element.isOutCanva()) {
				this.ennemy.splice(0, 1);
			}
		});

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

	//Créer un ennemi
	spawnEnnemy() {
		this.ennemy.push(
			new Ennemy(
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',
				3,
				15
			)
		);
	}
}
