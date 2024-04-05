import Draw from '../Draw.js';
import BaseValue from '../BaseValue.js';

/**
 * Class to display the projectile.
 * x, y - The position of the projectile.
 * ready - The state of the projectile image, true if loaded, false otherwise.
 * skin - The projectile skin.
 * image - The projectile image.
 */
export default class ProjectileDisplay {
	x;
	y;
	ready;
	skin = '/images/player/1.png';
	image;

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = this.skin;
		this.ready = false;
		this.image.addEventListener('load', event => {
			this.ready = true;
		});
	}

	/**
	 * Function to display the projectile image.
	 */
	display() {
		Draw.draw(
			this.image,
			this.x,
			this.y,
			BaseValue.projectileWidth,
			BaseValue.projectileHeight
		);
	}

	/**
	 * Getter of the projectile position on the x axe.
	 */
	getX() {
		return this.x;
	}

	/**
	 * Getter of the projectile position on the y axe.
	 */
	getY() {
		return this.y;
	}

	/**
	 * Getter of the state of the projectile image.
	 */
	getReady() {
		return this.ready;
	}
}
