import Draw from '../Draw.js';
import BaseValue from '../BaseValue.js';

const projectileWidth = 30;
const projectileHeight = 10;

export default class ProjectileDisplay {
	x;
	y;
	projSkin = '/images/player/1.png';
	projImage;
	projReady;

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.projImage = new Image();
		this.projImage.src = this.projSkin;
		this.projReady = false;
		this.projImage.addEventListener('load', event => {
			this.projReady = true;
		});
	}

	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getReady() {
		return this.projReady;
	}

	display() {
		Draw.draw(
			this.projImage,
			this.x,
			this.y,
			projectileWidth,
			projectileHeight
		);
	}
}
