/**
 * Base class of our application's views.
 * Allow to associate an HTML element to the view and to display/hide it.
 */
export default class View {
	/**
	 * HTML element associated to the view.
	 */
	element;

	constructor(element) {
		this.element = element;
	}
	/**
	 * Display the view by adding to it the `active` css class.
	 */
	show() {
		this.element.classList.add('active');
	}
	/**
	 * Hide the view by removing to it the `active` css class.
	 */
	hide() {
		this.element.classList.remove('active');
	}
}
