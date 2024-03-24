import { draw } from '../../vue/draw.js';
import { getcanvasClientHeight, getcanvasHeight } from '../canvasInfo.js';

const URL = '/images/background/background3.png';
const backgroundSpeed = 1;
let x = 0;

export class Background {
	constructor() {
		setTimeout(() => {
			this.ready = false;
			this.image = new Image();
			this.image.src = URL;
			this.image.addEventListener('load', event => {
				this.scaledWidth =
					(this.image.naturalWidth / this.image.naturalHeight) *
					getcanvasClientHeight();
				setInterval(this.backgroundMove, 1000 / 60, this.scaledWidth);
				this.ready = true;
			});
		}, 100);
	}

	backgroundMove(value) {
		x = x - backgroundSpeed;
		if (x < -value) {
			x = 0;
		}
	}

	getReady() {
		return this.ready;
	}

	display() {
		draw(this.image, x, 0, this.scaledWidth, getcanvasHeight());
		draw(
			this.image,
			x + this.scaledWidth - 1,
			0,
			this.scaledWidth,
			getcanvasHeight()
		);
		draw(
			this.image,
			x + this.scaledWidth * 2 - 2,
			0,
			this.scaledWidth,
			getcanvasHeight()
		);
	}
}
