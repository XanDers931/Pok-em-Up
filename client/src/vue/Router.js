/**
 * Router class that allows to manage the navigation in the app between the views.
 */
export default class Router {
	/**
	 * *Paths/views table of the application.
	 * @example `Router.routes = [{ path: '/game', view: gameView}]`
	 */
	static routes = [];
	static currentRoute;

	/**
	 * Display the view associated to `path` in the `routes` table.
	 * @param {String} path URL page to display.
	 */
	static navigate(path) {
		const route = this.routes.find(route => route.path === path);
		if (route) {
			if (this.currentRoute) {
				this.currentRoute.view.hide();
			}
			this.currentRoute = route;
			route.view.show(path.substring(route.path.length - 1));
		}
	}
}
