import View from './View.js';
import Router from './Router.js';

/**
 * The pause view class of the application.
 * Listens the resume button in order to go back to the game.
 */
export default class PauseView extends View {
	socket;
	constructor(element, socket) {
		super(element);
		this.socket = socket;

		const resumeButton = this.element.querySelector('button');

		resumeButton.addEventListener('click', event => {
			event.preventDefault();
			const buttonHref = resumeButton.getAttribute('href');
			this.socket.emit('game', true);
			Router.navigate(buttonHref);
		});
	}
}
