import { draw } from '../../vue/draw.js';

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

let lastXdirection = 0;
let lastYdirection = 0;

export class Player {
	constructor(canvas, skin, color) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		canvasHeight = this.canvas.clientHeight;
		canvasWidth = this.canvas.clientWidth;
		x = canvasWidth / 8 - playerWidhtSize / 2;
		y = canvasHeight / 2 - playerHeightSize / 2;
		this.image = new Image();
		this.image.src = this.skin();
		this.ready = false;
		this.image.addEventListener('load', event => {
			setInterval(this.move, 1000 / 60);
			//setInterval(this.loseSpeed, 1000 / 60);
			document.addEventListener('keydown', this.handleKeyboardStart);
			document.addEventListener('keyup', this.handleKeyboardEnd);
			this.ready = true;
		});
	}

	getPlayerWidht() {
		return playerWidhtSize;
	}

	getX() {
		return x;
	}

	getY() {
		return y;
	}

	getReady() {
		return this.ready;
	}

	display() {
		draw(this.image, x, y, playerWidhtSize, playerHeightSize);
	}

	move() {
		if (left && lastXdirection == 0) {
			if (x > playerBorder) {
				xDirection = 0;
				x -= vitesse;
			}
		}
		if (right && lastXdirection == 1) {
			if (x < canvasWidth - playerBorderRight) {
				xDirection = 0;
				x += vitesse;
			}
		}
		if (up && lastYdirection == 0) {
			if (y > playerBorder) {
				yDirection = 0;
				y -= vitesse;
			}
		}
		if (down && lastYdirection == 1) {
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
	}

	handleKeyboardStart(event) {
		if (event.key == 'ArrowLeft' || event.key == 'q') {
			left = true;
			lastXdirection = 0;
		}
		if (event.key == 'ArrowRight' || event.key == 'd') {
			right = true;
			lastXdirection = 1;
		}
		if (event.key == 'ArrowUp' || event.key == 'z') {
			up = true;
			lastYdirection = 0;
		}
		if (event.key == 'ArrowDown' || event.key == 's') {
			down = true;
			lastYdirection = 1;
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
			lastXdirection = 1;
		}
		if (event.key == 'ArrowRight' || event.key == 'd') {
			right = false;
			lastXdirection = 0;
		}
		if (event.key == 'ArrowUp' || event.key == 'z') {
			up = false;
			lastYdirection = 1;
		}
		if (event.key == 'ArrowDown' || event.key == 's') {
			down = false;
			lastYdirection = 0;
		}
	}

	skin() {
		return '/images/test.png';
	}
}
