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

	static drawText(text, x, y, size) {
		this.context.font = `${Draw.canvas.width / size}px Comic sans ms`;
		this.context.fillStyle = '#FF2222';
		this.context.fillText(
			text,
			(x * Draw.canvas.width) / BaseValue.width,
			(y * Draw.canvas.height) / BaseValue.height
		);
	}

	static drawScore(monsterKill, time) {
		// à mieux centrée
		let score = calculateScore(monsterKill, time);
		let size = Draw.canvas.width / 60;
		this.context.font = `${size}px Comic sans ms`;
		this.context.fillStyle = '#FFFFFF';
		this.context.fillText(
			'Score: ' + score,
			Draw.canvas.width / 2 - (Draw.canvas.width / 100) * 5,
			30
		);
	}
}
