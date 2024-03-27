import View from './View.js';
import { calculateScore } from '../modele/inGame/score.js';
import Router from './Router.js';

export default class EndView extends View {
	constructor(element) {
		super(element);
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
		score.innerHTML = calculateScore(10, 10);
	}
}
