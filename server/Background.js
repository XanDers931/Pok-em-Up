import BaseValue from './BaseValue.js';

/**
 * Classe de gestion des constantes
 * Permet de stocker et initialiser les constantes du jeu
 */
export default class Background {
	x;
	state;

	constructor() {
		this.x = 0;
		setInterval(event => this.backgroundMove(), 1000 / 60);
	}

	backgroundMove() {
		if (this.state == false) {
			return;
		}

		this.x = this.x - BaseValue.backgroundSpeed;
		if (this.x < -BaseValue.width) {
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
