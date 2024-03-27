import View from './View.js';
import Background from './inGame/Background.js';
import Player from '../modele/inGame/Player.js';
import Ennemy from '../modele/inGame/Ennemy.js';
import Router from './Router.js';
import Draw from './Draw.js';
import BaseValue from './BaseValue.js';

export default class GameView extends View {
	start;
	canvas;
	context;
	background;
	player;
	ennemy = [];
	socket;

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
			BaseValue.initialise(1920, 1080, 1000 / 60, 1000);

			this.background = new Background();
			this.socket.on('bgPosition', data => {
				//console.log(data);
				this.background.setX(data);
			});
			// Player argument 1 : skin id
			this.player = new Player(1);

			setInterval(event => this.spawnEnnemy(), BaseValue.spawnRate);

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

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.background.getReady()) {
			this.background.display();
		}

		if (this.player.getReady()) {
			this.player.display();
		}

		//console.log(this.player.projectile);

		this.player.projectile.forEach(element => {
			if (element.getReady()){
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

		this.context.stroke();
		requestAnimationFrame(event => this.render(event));
	}

	//Créer un ennemi
	spawnEnnemy() {
		this.ennemy.push(new Ennemy('/images/player/0.png', 3, 15));
	}
}
