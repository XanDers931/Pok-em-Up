import View from './View.js';
import Router from './Router.js';
export default class MenuView extends View {
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
