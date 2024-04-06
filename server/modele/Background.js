import BaseValue from './BaseValue.js';

/**
 * Class to manage background translation.
 * Allow to start the translation of the background, to pause it and to get the current position of it.
 * x - The position of the background.
 * runnning - The state of the background, true if translating, false otherwise.
 */
export default class Background {
	x;
	running;

	constructor() {
		this.x = 0;
		this.running = false;

		setInterval(event => this.backgroundMove(event), 1000 / 60);
	}

	/**
	 * Function to move the position of the background.
	 */
	backgroundMove() {
		if (this.running == true) {
			this.x = this.x - BaseValue.backgroundSpeed;
			if (this.x < -BaseValue.width) {
				this.x = 0;
			}
		}
	}

	/**
	 * Setter of the background state, use to start and stop the translation of the background.
	 */
	setState(state) {
		this.running = state;
	}

	/**
	 * Getter of the background position.
	 */
	getPosition() {
		return this.x;
	}
}
