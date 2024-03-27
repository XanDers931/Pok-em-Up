import BaseValue from './BaseValue.js';
import { calculateScore } from '../modele/inGame/score.js';

export default class Draw {
	canvas;
	context;

	static initialise(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		const canvasResizeObserver = new ResizeObserver(() =>
			this.resampleCanvas()
		);
		canvasResizeObserver.observe(this.canvas);
	}

	static draw(image, x, y, width, height) {
		this.context.drawImage(
			image,
			(x * Draw.canvas.width) / BaseValue.width,
			(y * Draw.canvas.height) / BaseValue.height,
			(width * Draw.canvas.width) / BaseValue.width,
			(height * Draw.canvas.height) / BaseValue.height
		);
	}

	static resampleCanvas() {
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
	}
}

export function drawScore() {
	let score = calculateScore(10, 2);
	ctx.font = '16px Arial';
	ctx.fillStyle = '#0095DD';
	ctx.fillText('Score: ' + score, 8, 20);
}
