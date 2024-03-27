import Draw from '../../vue/Draw.js';

export default class DamageArea {
	firstX;
	firstY;
	secondX;
	secondY;
	ready;

	constructor(firstX, firstY, secondX, secondY) {
		this.ready = false;

		this.firstX = firstX;
		this.firstY = firstY;
		this.secondX = secondX;
		this.secondY = secondY;
		/*
		this.image = new Image();
		this.image.src = `/images/damageArea.png`;
		this.image.addEventListener('load', event => {
			this.ready = true;
		});
		*/
	}

	/*
	display() {
		Draw.draw(this.image, this.firstX, this.firstY, this.secondX, this.secondY);
	}
	*/

	getReady() {
		return this.ready;
	}
}
