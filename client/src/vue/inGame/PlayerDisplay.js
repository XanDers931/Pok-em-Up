import Draw from '../Draw.js';
import BaseValue from '../BaseValue.js';
import Projectile from '../../modele/inGame/Projectiles.js';

/**
 * Class to display the player.
 * x, y - The position of the player.
 * ready - The state of the player image, true if loaded, false otherwise.
 * image - The player image.
 * projectiles - The projectiles the player shot.
 */
export default class Player {
	x;
	y;
	ready;
	image;
	projectiles;

	/**
	 * The constructor of the PlayerDisplay class.
	 * skin - The if of the player image.
	 */
	constructor(skin) {
		this.ready = false;
		this.x = 0;
		this.y = 0;
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
	}

	/**
	 * Function to make the image url with the id.
	 */
	skin(id) {
		return `/images/player/${id}.png`;
	}

	/**
	 * Setter of the player shots.
	 */
	setProjectiles(projectiles) {
		this.projectiles = projectiles;
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
