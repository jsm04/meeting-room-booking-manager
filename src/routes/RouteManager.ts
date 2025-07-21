import { BaseRoute } from './BaseRouter';

export class RouteManager {
	private routes: BaseRoute[] = [];

	set(): Record<string, any> {
		return Object.assign({}, ...this.routes.map((instance) => instance.routes));
	}
}
