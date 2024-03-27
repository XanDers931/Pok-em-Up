import View from './View.js';
import { Background } from './inGame/background.js';
import { Player } from '../modele/inGame/player.js';
import { Ennemy } from '../modele/inGame/ennemies.js';
import Router from './Router.js';
import { Draw } from './draw.js';
import { BaseValue } from './baseValue.js';

export default class GameView extends View {
	start;
	canvas;
	context;
	background;
	player;
	ennemy;

	constructor(element) {
		super(element);
		this.start = false;
	}

	show() {
		super.show();
		if (this.start == false) {
			this.start = true;

			this.canvas = this.element.querySelector('.gameCanvas');
			this.context = this.canvas.getContext('2d');
			Draw.initialise(this.canvas);
			BaseValue.initialise(1920, 1080, 1000 / 60);

			this.background = new Background();
			// Player argument 1 : skin id
			this.player = new Player(1);

			this.ennemy = new Ennemy('/images/player/1.png', 1, 10);

			requestAnimationFrame(event => this.render(event));

			document.addEventListener('keydown', this.handleEscapePause);
		}
	}

	handleEscapePause(event) {
		if (event.key == 'Escape') {
			Router.navigate('/');
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

		if (this.ennemy.getReady()) {
			this.ennemy.display();
			this.ennemy.move();
		}

		this.context.stroke();
		requestAnimationFrame(event => this.render(event));
	}
}
