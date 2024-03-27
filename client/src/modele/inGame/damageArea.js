import Draw from '../../vue/Draw.js';

export default class damageArea {
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
		//console.log(firstX);
		//console.log(this.firstX);
		this.image = new Image();
		this.image.src = `/images/damageArea.png`;
		this.image.addEventListener('load', event => {
			this.ready = true;
		});
	}

	display() {
		/*
		console.log(this.firstX);
		console.log(this.firstY);
		console.log(this.secondX);
		console.log(this.secondY);
		*/

		Draw.draw(this.image, this.firstX, this.firstY, this.secondX, this.secondY);
	}

	getReady() {
		return this.ready;
	}
}
