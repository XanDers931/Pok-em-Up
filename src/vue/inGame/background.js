const URL = '/images/background/background3.png';
const backgroundSpeed = 5;
let x = 0;

export class Background {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.ready = false;
		this.image = new Image();
		this.image.src = URL;
		this.image.addEventListener('load', event => {
			this.scaledWidth =
				(this.image.naturalWidth / this.image.naturalHeight) *
				this.canvas.clientHeight;
			setInterval(this.backgroundMove, 1000 / 60, this.scaledWidth);
			this.ready = true;
		});
	}

	backgroundMove(value) {
		x = x - backgroundSpeed;
		if (x < -value) {
			x = 0;
		}
	}

	getReady() {
		return this.ready;
	}

	display() {
		this.context.drawImage(
			this.image,
			x,
			0,
			this.scaledWidth,
			this.canvas.height
		);
		this.context.drawImage(
			this.image,
			x + this.scaledWidth,
			0,
			this.scaledWidth,
			this.canvas.height
		);
	}
}
