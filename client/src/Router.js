/**
 * Classe Router qui permet de gérer la navigation dans l'application sans rechargement de page.
 * (Single Page Application)
 */
export default class Router {
	/**
	 * Tableau des routes/vues de l'application.
	 * @example `Router.routes = [{ path: '/help', view: helpView, title: 'Support' }]`
	 */
	static routes = [];
	static currentRoute;

	static #menuElement; // propriété statique et privée (#...)

	/**
	 * Setter qui indique au `Router` la balise HTML contenant le menu de navigation.
	 * Écoute le clic sur chaque lien et déclenche la méthode `Router.navigate`.
	 * @param {Element} menuElement
	 * @see Router.handleMenuLinkClick
	 * @see Router.navigate
	 */
	static setMenuElement(menuElement) {
		this.#menuElement = menuElement;
		// on écoute le clic sur tous les liens du menu
		const menuLinks = this.#menuElement.querySelectorAll('a');
		menuLinks.forEach(link =>
			link.addEventListener('click', event => {
				event.preventDefault();
				// on récupère le href du lien cliqué pour déclencher navigate(...)
				const linkHref = event.currentTarget.getAttribute('href');
				Router.navigate(linkHref);
			})
		);
	}
	/**
	 * Affiche la view correspondant à `path` dans le tableau `routes`
	 * @param {String} path URL de la page à afficher
	 */
	static navigate(path) {
		const route = this.routes.find(route => route.path === path);
		if (route) {
			// on masque la vue précédente
			if (this.currentRoute) {
				this.currentRoute.view.hide();
			}
			this.currentRoute = route;
			// on affiche la nouvelle vue
			route.view.show(path.substring(route.path.length - 1));
		}
	}
}
