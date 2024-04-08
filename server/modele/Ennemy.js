import { collider } from '../../client/src/modele/inGame/Collision.js';
import BaseValue from './BaseValue.js';
import DATA from './Data.js';

/**
 * Class to manage an ennemy of the game.
 * Allow to move an ennemy and get his position.
 * x, y - The position of the ennemy.
 * speed - The speed of the ennemy movement.
 * idImage - The id corresponding to an image from the API
 * runnning - The state of the ennemy, true if moving, false otherwise.
 */
export default class Ennemy {
	static lastId = 0;
	id;
	x;
	y;
	upsideDown;
	speed;
	idImage;
	running;

	constructor(speed) {
		Ennemy.lastId = Ennemy.lastId + 1;
		this.id = Ennemy.lastId;
		this.x = BaseValue.width;
		this.idImage = DATA[Math.floor(Math.random() * DATA.length + 1)];
		this.x = BaseValue.width;
		this.y = Math.random() * (BaseValue.height - BaseValue.ennemyHeight);
		this.speed = speed;
		this.running = true;
		this.upsideDown = true;

		setInterval(event => this.move(event), 1000 / 60);
		setInterval(event => this.takeRandomUpsideDown(event), 500);
	}

	/**
	 * Function to move the ennemy based on his speed.
	 */
	move() {
		if (this.running == true) {
			this.x -= this.speed;
			if (this.upsideDown && this.y > 0) {
				this.y++;
			} else if (this.upsideDown == false && this.y < BaseValue.height) {
				this.y--;
			}
		}
	}

	/**
	 *
	 */
	takeRandomUpsideDown() {
		if (Math.random() > 0.5) {
			this.upsideDown = true;
		} else {
			this.upsideDown = false;
		}
	}

	/**
	 * Function to check if the ennemy is out of the canvas, return true if it is, false otherwise.
	 */
	isOutCanva() {
		return this.x < 0 - BaseValue.ennemyWidth;
	}

	/**
	 * Setter of the ennemy state, use to start and stop the movement of the ennemy.
	 */
	setState(state) {
		this.running = state;
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

	collideWithPlayer(
		damagerX,
		damagerY,
		damagerWidth,
		damagerHeight,
		hitX,
		hitY,
		hitWidht,
		hitHeight
	) {
		if (
			collider(
				damagerX,
				damagerY,
				damagerWidth,
				damagerHeight,
				hitX,
				hitY,
				hitWidht,
				hitHeight
			)
		) {
			return true;
		}
		return false;
	}
}
