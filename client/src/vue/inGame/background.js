import { Draw } from '../../vue/draw.js';
import { BaseValue } from '../baseValue.js';

const URL = '/images/background/background3.png';
const backgroundSpeed = 1;
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
		if (x < -BaseValue.width) {
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
		Draw.draw(this.image, x, 0, BaseValue.width, BaseValue.height);
		Draw.draw(
			this.image,
			x + BaseValue.width - 2,
			0,
			BaseValue.width,
			BaseValue.height
		);
	}
}
