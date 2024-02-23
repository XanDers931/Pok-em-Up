import { entity } from './entity.js';

const playerWidhtSize = 32;
const playerHeightSize = 32;

const playerBorder = 10;
const playerBorderDown = playerHeightSize + playerBorder;
const playerBorderRight = playerWidhtSize + playerBorder;

const vitesse = 5;
const maxSpeed = 10;
const speedBeforeStop = 3;
const decreaseSpeedMult = 0.9;

let x = 0;
let y = 0;
let xDirection = 0;
let yDirection = 0;
let canvasHeight;
let canvasWidth;
export class Player {
	constructor(canvas, skin, color) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		canvasHeight = this.canvas.clientHeight;
		canvasWidth = this.canvas.clientWidth;
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
		if (x > canvasWidth - playerBorderRight) {
			xDirection = 0;
			x -= vitesse;
		}
		if (x < playerBorder) {
			xDirection = 0;
			x += vitesse;
		}
		if (y > canvasHeight - playerBorderDown) {
			yDirection = 0;
			y -= vitesse;
		}
		if (y < playerBorder) {
			yDirection = 0;
			y += vitesse;
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

		x += xDirection;
		y += yDirection;
	}

	handleKeyboardStart(event) {
		if (event.key == 'ArrowLeft' || event.key == 'q') {
			xDirection += -vitesse;
		}
		if (event.key == 'ArrowRight' || event.key == 'd') {
			xDirection += vitesse;
		}
		if (event.key == 'ArrowDown' || event.key == 's') {
			yDirection += vitesse;
		}
		if (event.key == 'ArrowUp' || event.key == 'z') {
			yDirection += -vitesse;
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
			xDirection = 0;
		}
		if (event.key == 'ArrowRight' || event.key == 'd') {
			xDirection = 0;
		}
		if (event.key == 'ArrowDown' || event.key == 's') {
			yDirection = 0;
		}
		if (event.key == 'ArrowUp' || event.key == 'z') {
			yDirection = 0;
		}
	}

	skin() {
		return '/images/test.png';
	}
}
