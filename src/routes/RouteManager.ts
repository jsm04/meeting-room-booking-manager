import { BaseRoute } from './BaseRouter';

export class RouteManager {
	private routes: BaseRoute[] = [];

	addRoute(router: BaseRoute) {
		this.routes.push(router);
	}

	getRoutes(): Record<string, any> {
		return Object.assign({}, ...this.routes.map((instance) => instance.routes));
	}
}
