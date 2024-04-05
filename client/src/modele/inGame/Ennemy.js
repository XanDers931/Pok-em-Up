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
	ennemySpeed;
	ennemyReady = false;

	constructor(skin, speed, fireRate) {
		Ennemy.lastId++;
		this. id = Ennemy.lastId;
		this.spawn();
		this.ennemySpeed = speed;
		this.ennemySkin = skin;
		this.image = new Image();
		this.image.src = skin;
		this.image.addEventListener('load', event => {
			setInterval(event => this.move(), BaseValue.frameRate);
			this.ennemyReady = true;
		});
	}

	spawn() {
		this.x = BaseValue.width - ennemyWidhtSize;
		this.y = getRandomArbitrary(0, BaseValue.height - ennemyHeightSize);
	}

	move() {
		this.x -= this.ennemySpeed;
	}

	getId(){
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

	getEnnemyHeight() {
		return ennemyHeightSize;
	}

	getEnnemyWidth() {
		return ennemyWidhtSize;
	}

	isOutCanva() {
		return this.x < 0 - ennemyWidhtSize;
	}
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}
