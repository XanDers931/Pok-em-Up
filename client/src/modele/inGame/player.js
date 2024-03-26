import { Draw } from '../../vue/draw.js';

const defaultPlayerWitdhSize = 10;
const defaultPlayerHeightSize = 10;

const defaultWitdhScreenSize = 1920;
const defaultHeigthScreenSize = 1080;

let xSpeedPossible = 10; // Draw.canvas.width

const generalSpeed = 2;

let playerWidhtSize = 96; //(100 / defaultPlayerHeightSize) * defaultPlayerWitdhSize;
let playerHeightSize = 96; //(100 / defaultHeigthScreenSize) * defaultPlayerHeightSize;

const playerBorder = 30;
const playerBorderDown = playerHeightSize + playerBorder;
const playerBorderRight = playerWidhtSize + playerBorder;

const vitesse = 10;
const maxSpeed = 20;
const speedBeforeStop = 3;
const decreaseSpeedMult = 0.9;

let x = 0;
let y = 0;

let xSpeed = 0;
let ySpeed = 0;

let left = false;
let right = false;
let up = false;
let down = false;

export class Player {
	constructor(skin) {
		this.ready = false;

		xSpeed = 0;
		ySpeed = 0;

		x = Draw.canvas.width / 8 - playerWidhtSize;
		y = Draw.canvas.height / 2 - playerHeightSize;

		this.image = new Image();
		this.image.src = this.skin(skin);
		this.image.addEventListener('load', event => {
			setInterval(this.gainSpeed, 1000 / 60);
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
		Draw.draw(this.image, x, y, playerWidhtSize, playerHeightSize);
	}

	gainSpeed() {
		if (left && xSpeed > -maxSpeed) xSpeed -= generalSpeed;
		if (right && xSpeed <= maxSpeed) xSpeed += generalSpeed;
		if (up && ySpeed > -maxSpeed) ySpeed -= generalSpeed;
		if (down && ySpeed <= maxSpeed) ySpeed += generalSpeed;
	}

	move() {
		x += xSpeed;
		y += ySpeed;
		/*
		if (left) {
			xDirection = 0;
			x -= vitesse;
		}
		if (right) {
			xDirection = 0;
			x += vitesse;
		}
		if (up) {
			yDirection = 0;
			y -= vitesse;
		}
		if (down) {
			yDirection = 0;
			y += vitesse;
		}
		*/
		/*
		if (left && lastXdirection == 0) {
			if (x > playerBorder) {
				xDirection = 0;
				x -= vitesse;
			}
		}
		if (right && lastXdirection == 1) {
			if (x < 100 - playerBorderRight) {
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
			if (y < 100 - playerBorderDown) {
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
		*/
	}

	handleKeyboardStart(event) {
		if (event.key == 'ArrowLeft' || event.key == 'q') {
			left = true;
		}
		if (event.key == 'ArrowRight' || event.key == 'd') {
			console.log('là');
			right = true;
		}
		if (event.key == 'ArrowUp' || event.key == 'z') {
			up = true;
		}
		if (event.key == 'ArrowDown' || event.key == 's') {
			down = true;
		}
	}

	loseSpeed() {
		/*
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
		*/
	}

	handleKeyboardEnd(event) {
		if (event.key == 'ArrowLeft' || event.key == 'q') {
			left = false;
		}
		if (event.key == 'ArrowRight' || event.key == 'd') {
			right = false;
		}
		if (event.key == 'ArrowUp' || event.key == 'z') {
			up = false;
		}
		if (event.key == 'ArrowDown' || event.key == 's') {
			down = false;
		}
	}

	skin(id) {
		return `/images/player/${id}.png`;
	}
}
