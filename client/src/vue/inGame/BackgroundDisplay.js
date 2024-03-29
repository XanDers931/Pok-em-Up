import Draw from '../Draw.js';
import BaseValue from '../BaseValue.js';

const URL = '/images/background/background4.png';

/**
 * Class to display the background
 * x - The position of the background.
 * ready - The state of the background image, true if loaded, false otherwise.
 * image - The background image
 */
export default class Background {
	x;
	ready;
	image;

	constructor() {
		this.ready = false;
		this.x = 0;
		this.image = new Image();
		this.image.src = URL;
		this.image.addEventListener('load', event => {
			this.ready = true;
		});
	}

	/**
	 * Function to display the background image
	 */
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

	/**
	 * Setter of the background position
	 */
	setX(x) {
		this.x = x;
	}

	/**
	 * Getter of the state of the background image
	 */
	getReady() {
		return this.ready;
	}
}
