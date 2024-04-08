import Draw from '../Draw.js';
import BaseValue from '../BaseValue.js';

/**
 * Class to display the player.
 * x, y - The position of the player.
 * ready - The state of the player image, true if loaded, false otherwise.
 * image - The player image.
 * projectiles - The projectiles the player shot.
 */
export default class PlayerDisplay {
	socketId;
	x;
	y;
	name;
	ready;
	image;
	projectiles;

	/**
	 * The constructor of the PlayerDisplay class.
	 * skin - The id of the player image.
	 */
	constructor(skin, socketId, x, y, name) {
		this.socketId = socketId;
		this.ready = false;
		this.x = 0;
		this.y = 0;
		if (x && y) {
			this.x = x;
			this.y = y;
		}

		this.name = name;
		this.projectiles = [];
		this.image = new Image();
		this.image.src = this.skin(skin);
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
			BaseValue.playerWidthSize,
			BaseValue.playerHeightSize
		);
		Draw.drawText(this.name, this.x, this.y, 120, this.image.width);
	}

	/**
	 * Function to make the image url with the id.
	 */
	skin(id) {
		return `/images/player/${id}.png`;
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

	getProjectiles() {
		return this.projectiles;
	}
}
