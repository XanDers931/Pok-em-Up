import { Draw } from '../../vue/draw.js';

const URL = '/images/background/background3.png';
const backgroundSpeed = 1;
const width = 1920;
const height = 1080;
let x = 0;

export class Background {
	constructor() {
		this.ready = false;
		this.on = true;
		x = 0;
		this.image = new Image();
		this.image.src = URL;
		this.image.addEventListener('load', event => {
			setInterval(this.backgroundMove, 1000 / 60);
			this.ready = true;
		});
	}

	backgroundMove() {
		if (this.on == false) {
			return;
		}

		x = x - backgroundSpeed;
		if (x < -width) {
			x = 0;
		}
	}

	setOn(bool) {
		this.on = bool;
	}

	getReady() {
		return this.ready;
	}

	display() {
		Draw.draw(this.image, x, 0, 1920, 1080);
		Draw.draw(this.image, x + width - 2, 0, width, height);
	}
}
