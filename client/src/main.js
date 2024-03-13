/**
 * Canvas
 */
const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

/**
 *  Code
 */

import { Background } from './vue/inGame/background.js';
let bg = new Background(canvas);

import { Player } from './modele/inGame/player.js';
let p = new Player(canvas, 0, 0);

/**
 *  Render
 */

requestAnimationFrame(render);

console.log(canvas.width);

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (bg.getReady()) {
		bg.display();
	}
	if (p.getReady()) {
		p.display();
	}
	context.stroke();
	requestAnimationFrame(render);
}

/**
 * Canvas resize for each
 */
const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);

function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}
