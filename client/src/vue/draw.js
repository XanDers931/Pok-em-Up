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
