const backgroundSpeed = 1;
const width = 1920;
const height = 1080;

export default class Background {
	x;
	state;

	constructor(socket) {
		this.x = 0;
		setInterval(event => this.backgroundMove(), 1000 / 60);
	}

	backgroundMove() {
		if (this.state == false) {
			return;
		}

		this.x = this.x - backgroundSpeed;
		if (this.x < -width) {
			this.x = 0;
		}
	}

	setState(state) {
		this.state = state;
	}

	getPosition() {
		return this.x;
	}
}
