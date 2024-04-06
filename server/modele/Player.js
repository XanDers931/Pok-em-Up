import BaseValue from './BaseValue.js';
import Projectile from './Projectile.js';
/*
import Router from '../../vue/Router.js';
import { allColision } from './Collision.js';
*/

/**
 * Class to manage a player of the game.
 * Allow to move a player and get his position.
 * socketId - The socket of the client from where come the player.
 * x, y - The position of the player.
 * xSpeed, ySpeed - The speed vectors of the player movement.
 * left, right, up, down - The active directions.
 * fire - The status of the shooting, true if the player is shooting, false otherwise.
 * projectiles - The projectiles shot by the player.
 * ennemiesKilled - The number of ennemies killed by the player.
 * runnning - The state of the player, true if moving, false otherwise.
 */
export default class Player {
	skinId;
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
	ennemiesKilled;
	running;

	constructor(socketId, skinId) {
		this.skinId = skinId;
		this.socketId = socketId;
		this.x = BaseValue.width / 8 - BaseValue.playerWidth;
		this.y = BaseValue.height / 2 - BaseValue.playerHeight;
		this.name = '';
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
		this.fire = false;
		this.projectiles = [];
		this.ennemiesKilled;
		this.running = true;

		setInterval(event => this.increaseSpeed(event), BaseValue.frameRate);
		setInterval(event => this.move(event), BaseValue.frameRate);
		setInterval(event => this.decreaseSpeed(event), BaseValue.frameRate);
		setInterval(event => this.shootProjectile(event), 100);
		setInterval(event => this.deleteOutProjectiles(event), BaseValue.frameRate);
	}

	/**
	 * Function to increase the speed of the player movements.
	 */
	increaseSpeed() {
		if (this.running == true) {
			if (this.left && this.xSpeed > -BaseValue.maxSpeed)
				this.xSpeed -= BaseValue.generalSpeed;
			if (this.right && this.xSpeed <= BaseValue.maxSpeed)
				this.xSpeed += BaseValue.generalSpeed;
			if (this.up && this.ySpeed > -BaseValue.maxSpeed)
				this.ySpeed -= BaseValue.generalSpeed;
			if (this.down && this.ySpeed <= BaseValue.maxSpeed)
				this.ySpeed += BaseValue.generalSpeed;
		}
	}

	/**
	 * Function to decrease the speed of the player movements.
	 */
	decreaseSpeed() {
		if (this.running == true) {
			this.xSpeed = this.xSpeed * BaseValue.decreaseSpeedMult;
			this.ySpeed = this.ySpeed * BaseValue.decreaseSpeedMult;
		}
	}

	/**
	 * Function to move the player based on his speed vectors without allowing it to go out of the frame.
	 */
	move() {
		if (this.running == true) {
			if (this.x + this.xSpeed < BaseValue.playerBorder) this.xSpeed = 0;
			if (
				this.x + this.xSpeed >
				BaseValue.width - (BaseValue.playerBorder + BaseValue.playerWidth)
			)
				this.xSpeed = 0;
			if (this.y + this.ySpeed < BaseValue.playerBorder) this.ySpeed = 0;
			if (
				this.y + this.ySpeed >
				BaseValue.height - (BaseValue.playerBorder + BaseValue.playerHeight)
			)
				this.ySpeed = 0;

			this.x += this.xSpeed;
			this.y += this.ySpeed;
		}
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
	 * Function to fire a new projectile when fire is active.
	 */
	shootProjectile() {
		if (this.running && this.fire) {
			this.projectiles.push(
				new Projectile(
					this.x + BaseValue.playerWidth / 2,
					this.y + BaseValue.playerHeight / 2,
					20,
					0
				)
			);
		}
	}

	/**
	 * Function to delete all projectiles that are out of the canva (not displayed anymore).
	 */
	deleteOutProjectiles() {
		this.projectiles.forEach(element => {
			if (element.isOutCanva()) {
				let index = this.projectiles.indexOf(element);
				this.projectiles.splice(index, 1);
			}
		});
	}

	/**
	 * Function to delete all projectiles that hit an ennemy.
	 */
	deleteHitProjectiles(damageArea) {
		this.projectiles.forEach(element => {
			if (element.detectCollision(damageArea)) {
				let index = this.projectiles.indexOf(element);
				this.projectiles.splice(index, 1);
				this.ennemiesKilled++;
			}
		});
	}

	/*
	detectsCollision(damageAreaList) {
		if (allColision(damageAreaList, x, y, playerWidthSize, playerHeightSize)>0) {
			Router.navigate('/gameover');
		}
	}
	*/

	/**
	 * Setter of the player state, use to start and stop the movement of the player.
	 */
	setState(state) {
		this.running = state;
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
	 * Getter of the number of ennemies killed by the player.
	 */
	getEnnemisKilled() {
		return this.ennemiesKilled;
	}
}
