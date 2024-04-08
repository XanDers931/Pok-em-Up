import Router from './Router.js';
import View from './View.js';
import { calculateScore } from '../modele/inGame/score.js';

/**
 * Game Over View with restart button and the score
 */
export default class EndView extends View {
	socket;
	time;

	constructor(element, socket) {
		super(element);
		this.socket = socket;
		this.time = 0;

		this.socket.on('timeUpdate', newTime => {
			this.time = newTime;
		});

		const menuButtons = this.element.querySelectorAll('.end button');

		menuButtons.forEach(button =>
			button.addEventListener('click', event => {
				event.preventDefault();
				const buttonHref = event.currentTarget.getAttribute('href');
				Router.navigate(buttonHref);
			})
		);
	}

	show() {
		super.show();

		const score = this.element.querySelector('.score');
		const scoreDo = calculateScore(10, this.time);
		score.innerHTML = `Score : ${scoreDo}, Temps survécu : ${this.time}`;
		this.socket.emit('addScore', scoreDo);
	}
}
