import Draw from '../Draw.js';
import BaseValue from '../BaseValue.js';

/**
 * Class to display the player.
 * x, y - The position of the player.
 * ready - The state of the player image, true if loaded, false otherwise.
 * image - The player image.
 * projectiles - The projectiles the player shot.
 */
export default class BonusDisplay {
	socketId;
	x;
	y;
	image;

	/**
	 * The constructor of the PlayerDisplay class.
	 * skin - The if of the player image.
	 */
	constructor(socketId, x, y) {
		this.socketId = socketId;
		this.ready = false;
		this.x = 0;
		this.y = 0;
		if (x && y) {
			this.x = x;
			this.y = y;
		}
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
		/*
		Draw.draw(
			this.image,
			this.x,
			this.y,
			BaseValue.playerWidthSize,
			BaseValue.playerHeightSize
		);
		Draw.drawText(this.name, this.x, this.y, 100);
        */
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
