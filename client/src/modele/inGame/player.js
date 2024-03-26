import { Draw } from '../../vue/draw.js';

let generalSpeed = 0.5;

let playerWidhtSize = 64;
let playerHeightSize = 64;

let playerBorderLeft = 8;
let playerBorderRight = playerWidhtSize + playerBorderLeft;

let playerBorderTop = 8;
let playerBorderDown = playerHeightSize + playerBorderTop;

let maxSpeed = 10;
const decreaseSpeedMult = 0.96;

let x = 0;
let y = 0;

let xSpeed = 0;
let ySpeed = 0;

let left = false;
let right = false;
let up = false;
let down = false;

let oldWidth = 100;
let oldHeight = 100;

let first = true;

export class Player {
	constructor(skin) {
		this.ready = false;

		xSpeed = 0;
		ySpeed = 0;

		x = Draw.canvas.width / 8 - playerWidhtSize;
		y = Draw.canvas.height / 2 - playerHeightSize;

		const canvasResizeObserver = new ResizeObserver(() =>
			this.playerSizeUpdate()
		);
		canvasResizeObserver.observe(Draw.canvas);

		this.image = new Image();
		this.image.src = this.skin(skin);
		this.image.addEventListener('load', event => {
			//setInterval(this.playerSizeUpdate, 1000 / 60);
			setInterval(this.gainSpeed, 1000 / 60);
			setInterval(this.move, 1000 / 60);
			setInterval(this.loseSpeed, 1000 / 60);
			document.addEventListener('keydown', this.handleKeyboardStart);
			document.addEventListener('keyup', this.handleKeyboardEnd);
			this.ready = true;
		});
	}

	playerSizeUpdate() {
		playerWidhtSize = (3 / 100) * Draw.canvas.width;
		playerHeightSize = ((3 * 16) / 9 / 100) * Draw.canvas.height;

		playerBorderLeft = (0.5 / 100) * Draw.canvas.width;
		playerBorderRight = playerWidhtSize + playerBorderLeft;

		playerBorderTop = ((0.5 * 16) / 9 / 100) * Draw.canvas.height;
		playerBorderDown = playerHeightSize + playerBorderTop;

		if (first) {
			first = false;
		} else {
			x = (x / oldWidth) * Draw.canvas.width;
			y = (y / oldHeight) * Draw.canvas.height;
		}

		oldWidth = Draw.canvas.width;
		oldHeight = Draw.canvas.height;

		//x = (x / (10 / 100)) * Draw.canvas.width;
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
		// border left, right, top, bottom
		if (x + xSpeed < playerBorderLeft) xSpeed = 0;
		if (x + xSpeed > Draw.canvas.width - playerBorderRight) xSpeed = 0;
		if (y + ySpeed < playerBorderTop) ySpeed = 0;
		if (y + ySpeed > Draw.canvas.height - playerBorderDown) ySpeed = 0;

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
