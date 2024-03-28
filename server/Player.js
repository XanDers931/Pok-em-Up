import BaseValue from './BaseValue.js';
//import Projectile from './Projectiles.js';

let left = false;
let right = false;
let up = false;
let down = false;
//let fire = false;

// bug de déplacement car la focntio,n est appelle sur des varianbles globales pou r chque jouieurs cree

export default class Player {
	//projectile = [];
	x;
	y;
	xSpeed;
	ySpeed;
	constructor() {
		this.x = BaseValue.width / 8 - BaseValue.playerWidthSize;
		this.y = BaseValue.height / 2 - BaseValue.playerHeightSize;
		this.xSpeed = 0;
		this.ySpeed = 0;

		setInterval(event => this.gainSpeed(event), BaseValue.frameRate);
		setInterval(event => this.move(event), BaseValue.frameRate);
		setInterval(event => this.loseSpeed(event), BaseValue.frameRate);
		//setInterval(event => this.fireProj(), 100);
		//setInterval(event => this.deleteFireProj(), 100);
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	gainSpeed() {
		if (left && this.xSpeed > -BaseValue.maxSpeed)
			this.xSpeed -= BaseValue.generalSpeed;
		if (right && this.xSpeed <= BaseValue.maxSpeed)
			this.xSpeed += BaseValue.generalSpeed;
		if (up && this.ySpeed > -BaseValue.maxSpeed)
			this.ySpeed -= BaseValue.generalSpeed;
		if (down && this.ySpeed <= BaseValue.maxSpeed)
			this.ySpeed += BaseValue.generalSpeed;
	}

	loseSpeed() {
		this.xSpeed = this.xSpeed * BaseValue.decreaseSpeedMult;
		this.ySpeed = this.ySpeed * BaseValue.decreaseSpeedMult;
	}

	move() {
		// border left, right, top, bottom
		if (this.x + this.xSpeed < BaseValue.playerBorder) this.xSpeed = 0;
		if (
			this.x + this.xSpeed >
			BaseValue.width - (BaseValue.playerBorder + BaseValue.playerWidthSize)
		)
			this.xSpeed = 0;
		if (this.y + this.ySpeed < BaseValue.playerBorder) this.ySpeed = 0;
		if (
			this.y + this.ySpeed >
			BaseValue.height - (BaseValue.playerBorder + BaseValue.playerHeightSize)
		)
			this.ySpeed = 0;

		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	handleKeyboardStart(code) {
		if (code == 'ArrowLeft' || code == 'q') {
			left = true;
		}
		if (code == 'ArrowRight' || code == 'd') {
			right = true;
		}
		if (code == 'ArrowUp' || code == 'z') {
			up = true;
		}
		if (code == 'ArrowDown' || code == 's') {
			down = true;
		}
		if (code == 'Space') {
			fire = true;
		}
	}

	handleKeyboardEnd(code) {
		if (code == 'ArrowLeft' || code == 'q') {
			left = false;
		}
		if (code == 'ArrowRight' || code == 'd') {
			right = false;
		}
		if (code == 'ArrowUp' || code == 'z') {
			up = false;
		}
		if (code == 'ArrowDown' || code == 's') {
			down = false;
		}
		if (code == 'Space') {
			fire = false;
		}
	}

	/*
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

	*/
}
