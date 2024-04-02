import BaseValue from './BaseValue.js';
import Projectile from './Projectile.js';
/*
import Router from '../../vue/Router.js';
import { allColision } from './Collision.js';
*/

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
	socketId;
	x;
	y;
	name;
	xSpeed;
	ySpeed;
	left;
	right;
	up;
	down;
	fire;
	projectiles;
	constructor(socketId) {
		this.socketId = socketId;
		this.x = BaseValue.width / 8 - BaseValue.playerWidthSize;
		this.y = BaseValue.height / 2 - BaseValue.playerHeightSize;
		this.name = this.getPlayerName();
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
		this.fire = false;
		this.projectiles = [];

		setInterval(event => this.increaseSpeed(event), BaseValue.frameRate);
		setInterval(event => this.move(event), BaseValue.frameRate);
		setInterval(event => this.decreaseSpeed(event), BaseValue.frameRate);
		setInterval(event => this.shootProjectile(event), 100);
		setInterval(event => this.deleteProjectiles(event), 100);
	}

	getPlayerName() {
		let person = '';
		while (person == null || person == '') {
			person = 'Example'; //prompt('Nom du joueur :'); <- prompt undifine
		}
		return person;
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
	 * Function to active the direction and the shot of the player based on the keyboard.
	 */
	activeDirectionShot(code) {
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
			this.fire = true;
		}
	}

	/**
	 * Function to desactive the direction and the shot of the player based on the keyboard.
	 */
	desactiveDirectionShot(code) {
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

	/**
	 * Function to fire a new projectile when fire is active
	 */
	shootProjectile() {
		if (this.fire) {
			this.projectiles.push(
				new Projectile(
					this.x + BaseValue.playerWidthSize / 2,
					this.y + BaseValue.playerHeightSize / 2,
					20,
					0
				)
			);
		}
	}

	/**
	 * Function to delete all projectiles that are out of the canva (not displayed anymore)
	 */
	deleteProjectiles() {
		this.projectiles.forEach(element => {
			if (element.isOutCanva()) {
				this.projectiles.splice(0, 1);
			}
		});
	}

	/*
	detectsCollision(damageAreaList) {
		if (allColision(damageAreaList, x, y, playerWidthSize, playerHeightSize)) {
			Router.navigate('/gameover');
		}
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
