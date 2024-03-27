import { Draw } from '../../vue/draw.js';

const URL = '/images/background/background3.png';
const backgroundSpeed = 1;
const width = 1920;
const height = 1080;
let x = 0;

export class Background {
	x;
	constructor() {
		this.ready = false;
		this.on = true;
		this.x = 0;
		this.image = new Image();
		this.image.src = URL;
		this.image.addEventListener('load', event => {
			this.ready = true;
		});
	}

	setOn(bool) {
		this.on = bool;
	}

	getReady() {
		return this.ready;
	}

	display() {
		Draw.draw(this.image, this.x, 0, 1920, 1080);
		Draw.draw(this.image, this.x + width - 2, 0, width, height);
	}

	setX(x) {
		this.x = x;
	}
}
