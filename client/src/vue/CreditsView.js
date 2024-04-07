import View from './View.js';
import Router from './Router.js';

/**
 * The menu view class of the application.
 * Listens the buttons of the menu in order to display the next view.
 */
export default class CreditsView extends View {
	constructor(element) {
		super(element);

		const menuButtons = this.element.querySelectorAll('button');

		menuButtons.forEach(button =>
			button.addEventListener('click', event => {
				event.preventDefault();
				const buttonHref = event.currentTarget.getAttribute('href');
				Router.navigate(buttonHref);
			})
		);
	}
}
