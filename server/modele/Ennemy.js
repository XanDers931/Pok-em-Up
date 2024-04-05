import BaseValue from './BaseValue.js';
import Data from './Data.js';

/**
 * Class to manage an ennemy of the game.
 * Allow to move an ennemy and get his position.
 * x, y - The position of the ennemy.
 * speed - The speed of the ennemy movement.
 */
export default class Ennemy {
	idImage;
	x;
	y;
	speed;

	constructor(speed) {
		this.idImage = Data[Math.floor(Math.random() * Data.length + 1)];
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
