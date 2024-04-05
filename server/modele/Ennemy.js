import BaseValue from './BaseValue.js';
import DATA from './Data.js';

/**
 * Class to manage an ennemy of the game.
 * Allow to move an ennemy and get his position.
 * x, y - The position of the ennemy.
 * speed - The speed of the ennemy movement.
 * idImage - The id corresponding to an image from the API
 */
export default class Ennemy {
	x;
	y;
	speed;
	idImage;

	constructor(speed) {
		this.idImage = DATA[Math.floor(Math.random() * DATA.length + 1)];
		this.x = BaseValue.width;
		this.y = Math.random() * (BaseValue.height - BaseValue.ennemyHeight);
		this.speed = speed;

		setInterval(event => this.move(event), 1000 / 60);
	}

	/**
	 * Function to move the ennemy based on his speed.
	 */
	move() {
		this.x -= this.speed;
	}

	/**
	 * Function to check if the ennemy is out of the canvas, return true if it is, false otherwise.
	 */
	isOutCanva() {
		return this.x < 0 - BaseValue.ennemyWidth;
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
}
