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
	}

	getReady() {
		return this.ready;
	}
}
