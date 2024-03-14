let canvasClientHeight = 0;
let canvasClientWitdh = 0;
let canvasHeight = 0;
let canvasWitdh = 0;

export function getInfo(canvas) {
	canvasClientHeight = canvas.clientHeight;
	canvasClientWitdh = canvas.clientWidth;
	canvasHeight = canvas.height;
	canvasWitdh = canvas.width;
	console.log(canvasClientHeight);
	console.log(canvasClientWitdh);
	console.log(canvasHeight);
	console.log(canvasWitdh);
	return;
}

export function getcanvasClientHeight() {
	return canvasClientHeight;
}

export function getcanvasClientWitdh() {
	return canvasClientWitdh;
}

export function getcanvasHeight() {
	return canvasHeight;
}

export function getcanvasWitdh() {
	return canvasWitdh;
}
