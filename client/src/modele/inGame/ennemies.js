import { BaseValue } from '../../vue/baseValue.js';
import { Draw } from '../../vue/draw.js';

const ennemyWidhtSize = 96;
const ennemyHeightSize = 96;

export class Ennemy {
	x;
	y;
	ennemySkin;
	image;
	ennemySpeed;
	ennemyReady=false;

	constructor(skin, speed, fireRate) {
		setTimeout(() => {
			this.spawn();
		}, 100);
		this.ennemySpeed = speed;
		this.ennemySkin = skin;
		this.image = new Image();
		this.image.src = skin;
		this.image.addEventListener('load', event => {
			setInterval(event => this.move(), BaseValue.frameRate);
			//setInterval(this.fire, 1000/fireRate);
			this.ennemyReady = true;
		});
	}

	spawn() {
		this.x = BaseValue.width;
		this.y = getRandomArbitrary(0, BaseValue.height - ennemyHeightSize
		);
	}

	move() {
		this.x -= this.ennemySpeed;
	}

	/*
    fire(){
        new Projectile();
    }
    */

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

	isOutCanva(){
		return this.x<(0-ennemyWidhtSize);
	}

}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}
