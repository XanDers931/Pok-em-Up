import BaseValue from './BaseValue.js';
import { collider } from '../../client/src/modele/inGame/Collision.js';

/**
 * Class to manage a projectile of the game.
 * Allow to move a projectile and get his position.
 * x, y - The position of the projectile.
 * speed - The speed of the projectile movement.
 * direction - The direction of the projectile, if 0 then going to the right (shot by player), otherwise going to the left (shot by monster).
 * runnning - The state of the projectile, true if moving, false otherwise.
 */
export default class Projectile {
	x;
	y;
	speed;
	socketID;
	direction;
	running;

	constructor(x, y, speed, direction, socketID) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.socketID = socketID;
		this.direction = direction;
		this.running = true;

		setInterval(event => this.move(event), BaseValue.frameRate);
	}

	/**
	 * Function to move the projectile based on his speed and direction.
	 */
	move() {
		if (this.running == true) {
			if ((this.direction = 0)) {
				this.x -= this.speed;
			}
			if ((this.direction = 1)) {
				this.x += this.speed;
			}
		}
	}

	/**
	 * Function to check if the projectile is out of the canvas, return true if it is, false otherwise.
	 */
	isOutCanva() {
		return this.x > BaseValue.width || this.x < 0;
	}

	detectCollision(damagerX, damagerY, damagerWidth, damagerHeight, hitX, hitY, hitWidht, hitHeight) {
		return collider(damagerX, damagerY, damagerWidth, damagerHeight, hitX, hitY, hitWidht, hitHeight);
	}

	/**
	 * Setter of the projectile state, use to start and stop the movement of the projectile.
	 */
	setState(state) {
		this.running = state;
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

	getSocketId(){
		return this.socketID;
	}
}
