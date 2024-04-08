import BaseValue from './BaseValue.js';
import { calculateScore } from '../modele/inGame/score.js';

/**
 * Class to draw in the canvas with automatic resize
 * canvas - the canvas
 * context - the context of the canvas
 */
export default class Draw {
	canvas;
	context;

	/**
	 * give the canvas to the class
	 * @param {*} canvas
	 */
	static initialise(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		const canvasResizeObserver = new ResizeObserver(() =>
			this.resampleCanvas()
		);
		canvasResizeObserver.observe(this.canvas);
	}

	/**
	 * function to draw any image in the canvas and automatically resize it
	 * @param {*} image
	 * @param {*} x
	 * @param {*} y
	 * @param {*} width
	 * @param {*} height
	 */
	static draw(image, x, y, width, height) {
		this.context.drawImage(
			image,
			(x * Draw.canvas.width) / BaseValue.width,
			(y * Draw.canvas.height) / BaseValue.height,
			(width * Draw.canvas.width) / BaseValue.width,
			(height * Draw.canvas.height) / BaseValue.height
		);
	}

	/**
	 * resize the canvas
	 */
	static resampleCanvas() {
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
	}

	/**
	 * function to draw any text in the canvas and automatically resize it
	 * @param {*} text
	 * @param {*} x
	 * @param {*} y
	 * @param {*} size
	 */
	static drawText(text, x, y, size, width) {
		this.context.font = `${Draw.canvas.width / size}px Comic sans ms`;
		this.context.fillStyle = '#FF2222';
		this.context.textAlign = 'center';
		this.context.fillText(
			text,
			x + width / 2,
			(y * Draw.canvas.height) / BaseValue.height
		);
	}

	/**
	 * function to draw the score
	 * @param {*} monsterKill
	 * @param {*} time
	 */
	static drawScore(monsterKill, time) {
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
