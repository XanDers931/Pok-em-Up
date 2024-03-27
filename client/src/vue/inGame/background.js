import { Draw } from '../../vue/draw.js';
import { BaseValue } from '../baseValue.js';

const URL = '/images/background/background4.png';
const backgroundSpeed = 1;
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
		Draw.draw(this.image, this.x, 0, BaseValue.width, BaseValue.height);
		Draw.draw(
			this.image,
			this.x + BaseValue.width - 2,
			0,
			BaseValue.width,
			BaseValue.height
		);
	}

	setX(x) {
		this.x = x;
	}
}
