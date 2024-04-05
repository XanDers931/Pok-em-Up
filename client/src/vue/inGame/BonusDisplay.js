import Draw from '../Draw.js';
import BaseValue from '../BaseValue.js';

/**
 * Class to display the bonus.
 * x, y - The position of the bonus.
 * ready - The state of the bonus image, true if loaded, false otherwise.
 * image - The bonus image.
 */
export default class BonusDisplay {
	id;
	x;
	y;
	image;

	/**
	 * The constructor of the BonusDisplay class.
	 */
	constructor(id, x, y) {
		this.id = 1; // random entre 1 et le nombre de bonus
		this.ready = false;
		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = this.skin();
		this.image.addEventListener('load', event => {
			this.ready = true;
		});
	}

	/**
	 * Function to display the player image.
	 */
	display() {
		Draw.draw(
			this.image,
			this.x,
			this.y,
			BaseValue.bonusWidth,
			BaseValue.bonusHeight
		);
	}

	/**
	 * Function to make the image url with the id.
	 */
	skin() {
		return `/images/bonus/1.png`;
	}

	/**
	 * Setter of the player position on the x axe.
	 */
	setX(x) {
		this.x = x;
	}

	/**
	 * Setter of the player position on the y axe.
	 */
	setY(y) {
		this.y = y;
	}

	/**
	 * Getter of the state of the player image.
	 */
	getReady() {
		return this.ready;
	}
}
