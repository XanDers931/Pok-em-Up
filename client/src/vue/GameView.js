import View from './View.js';
import { getCanvas } from './draw.js';
import { getInfo } from './canvasInfo.js';
import { Background } from './inGame/background.js';
import { Player } from '../modele/inGame/player.js';
import Router from './Router.js';

export default class GameView extends View {
	start;
	canvas;
	context;
	bg;
	p;

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
