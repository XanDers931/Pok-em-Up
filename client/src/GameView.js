import View from './View.js';
import { getCanvas } from './vue/draw.js';
import { getInfo } from './vue/canvasInfo.js';
import { Background } from './vue/inGame/background.js';
import { Player } from './modele/inGame/player.js';

/**
 * Classe de base des vues de notre application.
 * Permet d'associer une balise HTML à la vue et de l'afficher/masquer.
 */
export default class GameView extends View {
	/**
	 * Balise HTML associée à la vue
	 */

	canvas;
	context;
	bg;
	p;

	constructor(element) {
		super(element);
	}

	show() {
		super.show();
		this.canvas = this.element.querySelector('.gameCanvas');
		this.context = this.canvas.getContext('2d');

		setTimeout(() => {
			getInfo(this.canvas);
		}, 100);
		getCanvas(this.canvas);

		this.bg = new Background(this.canvas.height, this.canvas.clientHeight);
		this.p = new Player(this.canvas, 0, 0);

		requestAnimationFrame(event => this.render(event));

		const canvasResizeObserver = new ResizeObserver(() =>
			this.resampleCanvas()
		);
		canvasResizeObserver.observe(this.canvas);
	}

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.bg.getReady()) {
			this.bg.display();
		}
		if (this.p.getReady()) {
			this.p.display();
		}
		this.context.stroke();
		requestAnimationFrame(event => this.render(event));
	}

	resampleCanvas() {
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
	}
}
