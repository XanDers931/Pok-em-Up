import BaseValue from './BaseValue.js';

/**
 * Class to manage a bonus of the game.
 * x, y - The position of the bonus.
 * xSpeed - The movement speed of the bonus
 */
export default class Bonus {
	static lastId = 0;
	id;
	x;
	y;
	xSpeed;

	constructor() {
		Bonus.lastId++;
		this.id = Bonus.lastId; // à changer pour en avoir un unique
		this.x = BaseValue.width;
		this.y = Math.floor(
			Math.random() * (BaseValue.height - BaseValue.bonusHeight)
		);
		this.xSpeed = 10;
		setInterval(event => this.move(event), BaseValue.frameRate);
	}

	/**
	 * Function to move the bonus based on the speed constants
	 */
	move() {
		this.x -= this.xSpeed;
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

	/**
	 * Delete Bonus
	 */
	isOutCanva() {
		return this.x < 0 - ennemyWidhtSize;
	}
}
