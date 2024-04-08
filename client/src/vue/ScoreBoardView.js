import Router from './Router.js';
import View from './View.js';
import getAllValueInTable from './inGame/ScoreBoardDataDisplay.js';

/**
 * Game Over View with restart button and the score
 */
export default class ScoreBoardView extends View {
	socket;
	value;

	constructor(element, socket) {
		super(element);
		this.socket = socket;
	}

	show() {
		super.show();

		const menuButtons = this.element.querySelectorAll('.scoreBoard button');

		menuButtons.forEach(button =>
			button.addEventListener('click', event => {
				event.preventDefault();
				const buttonHref = event.currentTarget.getAttribute('href');
				Router.navigate(buttonHref);
			})
		);

		const base = `<table class="table"><tr><th>Nom</th><th>Score</th></tr></table>`;

		this.socket.emit('showScoreBoard', null);

		this.socket.on('sendScoresData', data => {
			this.value = data;

			const table = this.element.querySelector('.scoreBoard .table');

			table.innerHTML = base + getAllValueInTable(this.value);
		});
	}
}
