import BaseValue from './BaseValue.js';
//import Projectile from './Projectiles.js';

/**
 * Class to manage a player of the game.
 * Allow to move a player and get his position.
 * x, y - The position of the player.
 * xSpeed, ySpeed - The speed vectors of the player movement.
 * left, right, up, down - The active directions.
 * fire - The status of the shooting, true if the player is shooting, false otherwise.
 * projectiles - The projectiles shot by the player.
 */
export default class Player {
	x;
	y;
	xSpeed;
	ySpeed;
	left;
	right;
	up;
	down;
	// let fire;
	// projectiles;
	constructor() {
		this.x = BaseValue.width / 8 - BaseValue.playerWidthSize;
		this.y = BaseValue.height / 2 - BaseValue.playerHeightSize;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
		// this.fire = false;
		// this.projectiles = [];

		setInterval(event => this.increaseSpeed(event), BaseValue.frameRate);
		setInterval(event => this.move(event), BaseValue.frameRate);
		setInterval(event => this.decreaseSpeed(event), BaseValue.frameRate);
		//setInterval(event => this.fireProj(), 100);
		//setInterval(event => this.deleteFireProj(), 100);
	}

	/**
	 * Function to increase the speed of the player movements.
	 */
	increaseSpeed() {
		if (this.left && this.xSpeed > -BaseValue.maxSpeed)
			this.xSpeed -= BaseValue.generalSpeed;
		if (this.right && this.xSpeed <= BaseValue.maxSpeed)
			this.xSpeed += BaseValue.generalSpeed;
		if (this.up && this.ySpeed > -BaseValue.maxSpeed)
			this.ySpeed -= BaseValue.generalSpeed;
		if (this.down && this.ySpeed <= BaseValue.maxSpeed)
			this.ySpeed += BaseValue.generalSpeed;
	}

	/**
	 * Function to decrease the speed of the player movements.
	 */
	decreaseSpeed() {
		this.xSpeed = this.xSpeed * BaseValue.decreaseSpeedMult;
		this.ySpeed = this.ySpeed * BaseValue.decreaseSpeedMult;
	}

	/**
	 * Function to move the player based on his speed vectors without allowing it to go out of the frame.
	 */
	move() {
		if (this.x + this.xSpeed < BaseValue.playerBorder) this.xSpeed = 0;
		if (
			this.x + this.xSpeed >
			BaseValue.width - (BaseValue.playerBorder + BaseValue.playerWidthSize)
		)
			this.xSpeed = 0;
		if (this.y + this.ySpeed < BaseValue.playerBorder) this.ySpeed = 0;
		if (
			this.y + this.ySpeed >
			BaseValue.height - (BaseValue.playerBorder + BaseValue.playerHeightSize)
		)
			this.ySpeed = 0;

		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	/**
	 * Function to active the direction of the player based on the keyboard.
	 */
	activeDirection(code) {
		if (code == 'ArrowLeft' || code == 'KeyA') {
			this.left = true;
		}
		if (code == 'ArrowRight' || code == 'KeyD') {
			this.right = true;
		}
		if (code == 'ArrowUp' || code == 'KeyW') {
			this.up = true;
		}
		if (code == 'ArrowDown' || code == 'KeyS') {
			this.down = true;
		}
		if (code == 'Space') {
			fire = true;
		}
	}

	/**
	 * Function to desactive the direction of the player based on the keyboard.
	 */
	desactiveDirection(code) {
		if (code == 'ArrowLeft' || code == 'KeyA') {
			this.left = false;
		}
		if (code == 'ArrowRight' || code == 'KeyD') {
			this.right = false;
		}
		if (code == 'ArrowUp' || code == 'KeyW') {
			this.up = false;
		}
		if (code == 'ArrowDown' || code == 'KeyS') {
			this.down = false;
		}
		if (code == 'Space') {
			this.fire = false;
		}
	}

	/*
	fireProj() {
		if (fire) {
			this.projectile.push(new Projectile(x, y, 20, 0));
		}
	}

	deleteFireProj() {
		this.projectile.forEach(element => {
			if (element.isOutCanva()) {
				this.projectile.splice(0, 1);
			}
		});
	}

	*/

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
