import Draw from '../Draw.js';
import BaseValue from '../BaseValue.js';
import Projectile from '../../modele/inGame/Projectiles.js';

export default class Player {
	x;
	y;
	projectiles;

	constructor(skin) {
		this.ready = false;
		this.x = 0;
		this.y = 0;
		this.projectiles = [];
		this.image = new Image();
		this.image.src = this.skin(skin);
		this.image.addEventListener('load', event => {
			this.ready = true;
		});
	}

	display() {
		Draw.draw(
			this.image,
			this.x,
			this.y,
			BaseValue.playerWidthSize,
			BaseValue.playerHeightSize
		);
	}

	skin(id) {
		return `/images/player/${id}.png`;
	}

	setProjectiles(projectiles) {
		this.projectiles = projectiles;
	}

	setX(x) {
		this.x = x;
	}

	setY(y) {
		this.y = y;
	}

	getReady() {
		return this.ready;
	}
}
