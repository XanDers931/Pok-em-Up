import Draw from '../../vue/Draw.js';
import BaseValue from '../../vue/BaseValue.js';
import Projectile from './Projectiles.js';

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
	socket;
	constructor(skin, socket) {
		this.ready = false;

		x = BaseValue.width / 8 - playerWidthSize;
		y = BaseValue.height / 2 - playerHeightSize;

		this.image = new Image();
		this.image.src = this.skin(skin);
		this.image.addEventListener('load', event => {
			setInterval(this.gainSpeed, BaseValue.frameRate);
			setInterval(this.move, BaseValue.frameRate);
			setInterval(this.loseSpeed, BaseValue.frameRate);
			//setInterval(event => this.fireProj(), 100);
			//setInterval(event => this.deleteFireProj(), 100);

			this.ready = true;
		});
	}

	getX() {
		return x;
	}

	getY() {
		return y;
	}

	setX(xv) {
		x = xv;
	}

	setY(yv) {
		y = yv;
	}

	getReady() {
		return this.ready;
	}

	display() {
		Draw.draw(this.image, x, y, playerWidthSize, playerHeightSize);
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

	skin(id) {
		return `/images/player/${id}.png`;
	}
}
