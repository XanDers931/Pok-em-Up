import Draw from '../../vue/Draw.js';
import BaseValue from '../../vue/BaseValue.js';
import Projectile from './Projectiles.js';
import Router from '../../vue/Router.js';

const playerWidthSize = 96;
const playerHeightSize = 128;

const generalSpeed = 0.5;

const playerBorder = 8;

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
let fire = false;

export default class Player {
	projectile = [];
	constructor(skin) {
		this.ready = false;

		x = BaseValue.width / 8 - playerWidthSize;
		y = BaseValue.height / 2 - playerHeightSize;

		this.image = new Image();
		this.image.src = this.skin(skin);
		this.image.addEventListener('load', event => {
			setInterval(this.gainSpeed, BaseValue.frameRate);
			setInterval(this.move, BaseValue.frameRate);
			setInterval(this.loseSpeed, BaseValue.frameRate);
			setInterval(event => this.fireProj(), 100);
			setInterval(event => this.deleteFireProj(), 100);
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
		Draw.draw(this.image, x, y, playerWidthSize, playerHeightSize);
	}

	gainSpeed() {
		if (left && xSpeed > -maxSpeed) xSpeed -= generalSpeed;
		if (right && xSpeed <= maxSpeed) xSpeed += generalSpeed;
		if (up && ySpeed > -maxSpeed) ySpeed -= generalSpeed;
		if (down && ySpeed <= maxSpeed) ySpeed += generalSpeed;
	}

	loseSpeed() {
		xSpeed = xSpeed * decreaseSpeedMult;
		ySpeed = ySpeed * decreaseSpeedMult;
	}

	move() {
		// border left, right, top, bottom
		if (x + xSpeed < playerBorder) xSpeed = 0;
		if (x + xSpeed > BaseValue.width - (playerBorder + playerWidthSize))
			xSpeed = 0;
		if (y + ySpeed < playerBorder) ySpeed = 0;
		if (y + ySpeed > BaseValue.height - (playerBorder + playerHeightSize))
			ySpeed = 0;

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
		if (event.code == 'Space') {
			fire = true;
		}
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
		if (event.code == 'Space') {
			fire = false;
		}
	}

	detectsCollision(damageAreaList) {
		damageAreaList.forEach(element => {
			if (
				(x > element.firstX &&
					x < element.firstX + element.secondX &&
					y > element.firstY &&
					y < element.firstY + element.secondY) ||
				(x > element.firstX &&
					x < element.firstX + element.secondX &&
					y + playerWidthSize > element.firstY &&
					y + playerWidthSize < element.firstY + element.secondY) ||
				(x + playerHeightSize > element.firstX &&
					x + playerHeightSize < element.firstX + element.secondX &&
					y > element.firstY &&
					y < element.firstY + element.secondY) ||
				(x + playerHeightSize > element.firstX &&
					x + playerHeightSize < element.firstX + element.secondX &&
					y + playerWidthSize > element.firstY &&
					y + playerWidthSize < element.firstY + element.secondY)
			) {
				Router.navigate('/');
			}
		}); /*
		if (
			x > damageAreaList[0].firstX &&
			x < damageAreaList[0].firstX + damageAreaList[0].secondX
		) {
			// && this.y > damageAreaList[0].getY() && this.x
			console.log('collision détecter');
		} else {
			console.log('pas de collision');
		} */
	}

	fireProj() {
		if (fire) {
			this.projectile.push(new Projectile(x, y, 20, 0));
		}
	}

	deleteFireProj() {
		this.projectile.forEach(element => {
			if (element.isOutCanva()) {
				this.projectile.splice(0, 1);
			}
		});
	}

	skin(id) {
		return `/images/player/${id}.png`;
	}
}
