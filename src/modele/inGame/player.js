import { entity } from './entity.js';

const playerWidhtSize = 64;
const playerHeightSize = 64;

const playerBorder = 30;
const playerBorderDown = playerHeightSize + playerBorder;
const playerBorderRight = playerWidhtSize + playerBorder;

const vitesse = 10;
const maxSpeed = 20;
const speedBeforeStop = 3;
const decreaseSpeedMult = 0.9;

let x = 0;
let y = 0;
let xDirection = 0;
let yDirection = 0;
let canvasHeight;
let canvasWidth;

let left = false;
let right = false;
let up = false;
let down = false;

export class Player {
	constructor(canvas, skin, color) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		canvasHeight = this.canvas.clientHeight;
		canvasWidth = this.canvas.clientWidth;
		x = canvasWidth / 8 - playerWidhtSize / 2;
		y = canvasHeight / 2 - playerHeightSize / 2;
		this.image = new Image();
		this.image.src = this.skin(skin);
		this.ready = false;
		this.image.addEventListener('load', event => {
			setInterval(this.move, 1000 / 60);
			//setInterval(this.loseSpeed, 1000 / 60);
			document.addEventListener('keydown', this.handleKeyboardStart);
			document.addEventListener('keyup', this.handleKeyboardEnd);
			this.ready = true;
		});
	}

	getReady() {
		return this.ready;
	}

	getCanvas() {
		return this.canvas;
	}

	getCanvasHeight() {
		return this.canvas.clientHeight;
	}

	display() {
		this.context.drawImage(this.image, x, y, playerWidhtSize, playerHeightSize);
	}

	move() {
		if (left) {
			console.log('no');
			if (x > playerBorder) {
				console.log('yes');
				xDirection = 0;
				x -= vitesse;
			}
		}
		if (right) {
			if (x < canvasWidth - playerBorderRight) {
				xDirection = 0;
				x += vitesse;
			}
		}
		if (up) {
			if (y > playerBorder) {
				yDirection = 0;
				y -= vitesse;
			}
		}
		if (down) {
			if (y < canvasHeight - playerBorderDown) {
				yDirection = 0;
				y += vitesse;
			}
		}
		if (xDirection >= maxSpeed) {
			xDirection = maxSpeed;
		}
		if (xDirection <= -maxSpeed) {
			xDirection = -maxSpeed;
		}
		if (yDirection >= maxSpeed) {
			yDirection = maxSpeed;
		}
		if (yDirection <= -maxSpeed) {
			yDirection = -maxSpeed;
		}

		/*
		x += xDirection;
		y += yDirection;
		*/
	}

	handleKeyboardStart(event) {
		if (event.key == 'ArrowLeft' || event.key == 'q') {
			left = true;
		}
		if (event.key == 'ArrowRight' || event.key == 'd') {
			right = true;
		}
		if (event.key == 'ArrowDown' || event.key == 's') {
			down = true;
		}
		if (event.key == 'ArrowUp' || event.key == 'z') {
			up = true;
		}
	}

	/*
	loseSpeed() {
		if (xDirection != 0) {
			xDirection = xDirection * decreaseSpeedMult;
		}
		if (xDirection < speedBeforeStop && xDirection > -speedBeforeStop) {
			xDirection = 0;
		}
		if (yDirection != 0) {
			yDirection = yDirection * decreaseSpeedMult;
		}
		if (yDirection < speedBeforeStop && yDirection > -speedBeforeStop) {
			yDirection = 0;
		}
	}
    */

	handleKeyboardEnd(event) {
		if (event.key == 'ArrowLeft' || event.key == 'q') {
			left = false;
		}
		if (event.key == 'ArrowRight' || event.key == 'd') {
			right = false;
		}
		if (event.key == 'ArrowDown' || event.key == 's') {
			down = false;
		}
		if (event.key == 'ArrowUp' || event.key == 'z') {
			up = false;
		}
	}

	skin() {
		return '/images/test.png';
	}
}
