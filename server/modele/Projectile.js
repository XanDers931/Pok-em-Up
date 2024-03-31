import BaseValue from './BaseValue.js';

/**
 * Class to manage a projectile of the game.
 * Allow to move a projectile and get his position.
 * x, y - The position of the projectile.
 * projSpeed - The speed of the projectile movement.
 * projWay - The direction of the projectile, if 0 then going to the right (shot by player), otherwise going to the left (shot by monster)
 */
export default class Projectile {
	x;
	y;
	projSpeed;
	projWay;

	constructor(x, y, speed, way) {
		this.x = x;
		this.y = y;
		this.projSpeed = speed;
		this.projWay = way;

		setInterval(event => this.move(event), BaseValue.frameRate);
	}

	/**
	 * Function to move the projectile based on his speed and way.
	 */
	move() {
		if ((this.way = 0)) {
			this.x -= this.projSpeed;
		}
		if ((this.way = 1)) {
			this.x += this.projSpeed;
		}
	}

	/**
	 * Function to check if the projectile is out of the canvas, return true if it is, false otherwise.
	 */
	isOutCanva() {
		return this.x > BaseValue.width;
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
}
