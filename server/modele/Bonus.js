import BaseValue from './BaseValue.js';

/**
 * Class to manage a bonus of the game.
 * x, y - The position of the bonus.
 * xSpeed - The movement speed of the bonus
 */
export default class Bonus {
	id;
	x;
	y;
	xSpeed;

	constructor() {
		this.id = 0; // à changer pour en avoir un unique
		this.x = BaseValue.width;
		this.y = Math.random() * (BaseValue.height - BaseValue.bonusHeight);
		this.xSpeed = 5;

		setInterval(event => this.move(event), BaseValue.frameRate);
	}

	/**
	 * Function to move the bonus based on the speed constants
	 */
	move() {
		this.x += this.xSpeed;
	}

	/**
	 * Getter of the player position on the x axe.
	 */
	getX() {
		return this.x;
	}

	/**
	 * Getter of the player position on the y axe.
	 */
	getY() {
		return this.y;
	}
}
