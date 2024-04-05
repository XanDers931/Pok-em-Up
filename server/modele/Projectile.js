import BaseValue from './BaseValue.js';

/**
 * Class to manage a projectile of the game.
 * Allow to move a projectile and get his position.
 * x, y - The position of the projectile.
 * speed - The speed of the projectile movement.
 * direction - The direction of the projectile, if 0 then going to the right (shot by player), otherwise going to the left (shot by monster)
 */
export default class Projectile {
	x;
	y;
	speed;
	direction;

	constructor(x, y, speed, direction) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.direction = direction;

		setInterval(event => this.move(event), BaseValue.frameRate);
	}

	/**
	 * Function to move the projectile based on his speed and direction.
	 */
	move() {
		if ((this.direction = 0)) {
			this.x -= this.speed;
		}
		if ((this.direction = 1)) {
			this.x += this.speed;
		}
	}

	/**
	 * Function to check if the projectile is out of the canvas, return true if it is, false otherwise.
	 */
	isOutCanva() {
		return this.x > BaseValue.width || this.x < 0;
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
