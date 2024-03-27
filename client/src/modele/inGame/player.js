import { Draw } from '../../vue/draw.js';
import { BaseValue } from '../../vue/baseValue.js';

const generalSpeed = 0.5;

const playerWidhtSize = 64;
const playerHeightSize = 64;

const playerBorderLeft = 8;
const playerBorderRight = playerWidhtSize + playerBorderLeft;

const playerBorderTop = 8;
const playerBorderDown = playerHeightSize + playerBorderTop;

const maxSpeed = 10;
const decreaseSpeedMult = 0.96;

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

		x = BaseValue.width / 8 - playerWidhtSize;
		y = BaseValue.height / 2 - playerHeightSize;

		this.image = new Image();
		this.image.src = this.skin(skin);
		this.image.addEventListener('load', event => {
			setInterval(this.gainSpeed, BaseValue.frameRate);
			setInterval(this.move, BaseValue.frameRate);
			setInterval(this.loseSpeed, BaseValue.frameRate);
			document.addEventListener('keydown', this.handleKeyboardStart);
			document.addEventListener('keyup', this.handleKeyboardEnd);
			this.ready = true;
		});
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
		// border left, right, top, bottom
		if (x + xSpeed < playerBorderLeft) xSpeed = 0;
		if (x + xSpeed > BaseValue.width - playerBorderRight) xSpeed = 0;
		if (y + ySpeed < playerBorderTop) ySpeed = 0;
		if (y + ySpeed > BaseValue.height - playerBorderDown) ySpeed = 0;

		x += xSpeed;
		y += ySpeed;
	}

	handleKeyboardStart(event) {
		if (event.key == 'ArrowLeft' || event.key == 'q') {
			left = true;
		}
		if (event.key == 'ArrowRight' || event.key == 'd') {
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
		xSpeed = xSpeed * decreaseSpeedMult;
		ySpeed = ySpeed * decreaseSpeedMult;
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
