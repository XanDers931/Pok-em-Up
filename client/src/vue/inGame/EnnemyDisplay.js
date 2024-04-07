import BaseValue from '../BaseValue.js';
import Draw from '../Draw.js';

/**
 * Class to display the ennemy.
 * lastId - ? (maybe to put to erver side)
 * id - The id of the ennemy (maybe to put to erver side)
 * x, y - The position of the ennemy.
 * ready - The state of the projectile image, true if loaded, false otherwise.
 * skin - The ennemy skin.
 * image - The ennemy image.
 */
export default class Ennemy {
	static lastId = 0;
	id;
	x;
	y;
	ready;
	skin;
	image;

	constructor(x, y, skin) {
		Ennemy.lastId++;
		this.id = Ennemy.lastId;
		this.ready = false;
		this.x = x;
		this.y = y;
		this.skin = skin;
		this.image = new Image();
		this.image.src = skin;
		this.image.addEventListener('load', event => {
			this.ready = true;
		});
	}

	/**
	 * Function to display the ennemy image.
	 */
	display() {
		Draw.draw(this.image, this.x, this.y, BaseValue.ennemyWidhtSize, BaseValue.ennemyHeightSize);
	}

	/**
	 * Setter of the ennemy position on the x axe.
	 */
	setX(x) {
		this.x = x;
	}

	/**
	 * Setter of the ennemy position on the y axe.
	 */
	setY(y) {
		this.y = y;
	}

	/**
	 * Getter of the ennemy id.
	 */
	getId() {
		return this.id;
	}

	/**
	 * Getter of the ennemy position on the x axe.
	 */
	getX() {
		return this.x;
	}

	/**
	 * Getter of the ennemy position on the y axe.
	 */
	getY() {
		return this.y;
	}

	/**
	 * Getter of the state of the ennemy image.
	 */
	getReady() {
		return this.ready;
	}
}
