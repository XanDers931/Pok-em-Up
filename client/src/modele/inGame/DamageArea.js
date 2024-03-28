import Draw from '../../vue/Draw.js';

export default class DamageArea {
	firstX;
	firstY;
	secondX;
	secondY;
	ready;

	constructor(firstX, firstY, secondX, secondY) {
		this.firstX = firstX;
		this.firstY = firstY;
		this.secondX = secondX;
		this.secondY = secondY;

		/* Il faut laisser le code commenté pour visualiser les hitbox
		this.ready = false;
		this.image = new Image();
		this.image.src = `/images/damageArea.png`;
		this.image.addEventListener('load', event => {
			this.ready = true;
		});
		*/
	}

	/*
	display() {
		Draw.draw(
			this.image,
			this.firstX + this.secondX * 0.1,
			this.firstY + this.secondY * 0.1,
			this.secondX - this.secondX * 0.3,
			this.secondY - this.secondY * 0.3
		);
	}
	*/

	getReady() {
		return this.ready;
	}
}
