import BaseValue from '../../vue/BaseValue.js';
import Draw from '../../vue/Draw.js';

const ennemyWidhtSize = 96;
const ennemyHeightSize = 96;

export default class Ennemy {
	static lastId = 0;
	id;
	x;
	y;
	ennemySkin;
	image;
	ennemyReady = false;

	constructor(x, y, skin) {
		Ennemy.lastId++;
		this.id = Ennemy.lastId;
		this.x = x;
		this.y = y;
		this.ennemySkin = skin;
		this.image = new Image();
		this.image.src = skin;
		this.image.addEventListener('load', event => {
			this.ennemyReady = true;
		});
	}

	setX(x) {
		this.x = x;
	}

	setY(y) {
		this.y = y;
	}

	getId() {
		return this.id;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getReady() {
		return this.ennemyReady;
	}

	display() {
		Draw.draw(this.image, this.x, this.y, ennemyWidhtSize, ennemyHeightSize);
	}
}
