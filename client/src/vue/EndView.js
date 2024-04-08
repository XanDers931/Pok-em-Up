import Router from './Router.js';
import View from './View.js';
import { calculateScore } from '../modele/inGame/score.js';

/**
 * Game Over View with restart button and the score
 */
export default class EndView extends View {
	socket;

	constructor(element, socket) {
		super(element);
		this.socket = socket;
	}

	show() {
		super.show();

		const menuButtons = this.element.querySelectorAll('.end button');

		menuButtons.forEach(button =>
			button.addEventListener('click', event => {
				event.preventDefault();
				const buttonHref = event.currentTarget.getAttribute('href');
				Router.navigate(buttonHref);
			})
		);

		const score = this.element.querySelector('.score');
		const scoreDo = calculateScore(10, 10);
		score.innerHTML = scoreDo;
		this.socket.emit('addScore', scoreDo);
	}
}
