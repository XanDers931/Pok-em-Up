const projectileWidth = 30;
const projectileHeight = 10;

export default class Projectile {
	x;
	y;
	projSkin = '/images/player/1.png';
	projImage;
	projSpeed;
	projWay; //if 0 fired by player, if 1 move to left
	projReady;

	constructor(x, y, speed, way) {
		this.x = x;
		this.y = y;
		this.projImage = new Image();
		this.projImage.src = this.projSkin;
		this.projSpeed = speed;
		this.projWay = way;
		this.projReady = false;
		this.projImage.addEventListener('load', event => {
			this.projReady = true;
		});
	}

	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getReady() {
		return this.projReady;
	}

	//if 0 move to right (fired by player)
	//if 1 move to left (fired by ennemy)
	move() {
		if ((this.way = 0)) {
			this.x += this.projSpeed;
		}
		if ((this.way = 1)) {
			this.x -= this.projSpeed;
		}
	}

	display() {
		Draw.draw(this.image, this.x, this.y, projectileWidth, projectileHeight);
	}
}
