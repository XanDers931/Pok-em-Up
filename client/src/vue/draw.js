import calculateScore from '../modele/inGame/score.js';
let canvas;
let context;
const image = new Image();

export function getCanvas(canvasModele) {
	canvas = canvasModele;
	context = canvas.getContext('2d');
	return;
}

export function draw(image, x, y, width, height) {
	context.drawImage(image, x, y, width, height);
}

export function drawScore() {
	let score = calculateScore(10, 2);
	ctx.font = '16px Arial';
	ctx.fillStyle = '#0095DD';
	ctx.fillText('Score: ' + score, 8, 20);
}
