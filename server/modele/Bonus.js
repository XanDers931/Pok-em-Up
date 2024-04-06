import BaseValue from './BaseValue.js';

/**
 * Class to manage a bonus of the game.
 * x, y - The position of the bonus.
 * xSpeed - The movement speed of the bonus.
 * runnning - The state of the bonus, true if moving, false otherwise.
 */
export default class Bonus {
	static lastId = 0;
	id;
	x;
	y;
	xSpeed;
	running;

	constructor() {
		Bonus.lastId++;
		this.id = Bonus.lastId; // à changer pour en avoir un unique
		this.x = BaseValue.width;
		this.y = Math.floor(
			Math.random() * (BaseValue.height - BaseValue.bonusHeight)
		);
		this.xSpeed = BaseValue.bonusSpeed;
		this.running = true;

		setInterval(event => this.move(event), BaseValue.frameRate);
	}

	/**
	 * Function to move the bonus based on the speed constants.
	 */
	move() {
		if (this.running == true) {
			this.x -= this.xSpeed;
		}
	}

	/**
	 * Function to check if the bonus is out of the canvas, return true if it is, false otherwise.
	 */
	isOutCanva() {
		return this.x < 0 - ennemyWidhtSize;
	}

	/**
	 * Setter of the bonus state, use to start and stop the movement of the bonus.
	 */
	setState(state) {
		this.running = state;
	}

	/**
	 * Getter of the bonus position on the x axe.
	 */
	getX() {
		return this.x;
	}

	/**
	 * Getter of the bonus position on the y axe.
	 */
	getY() {
		return this.y;
	}
}
