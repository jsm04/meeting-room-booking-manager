import { BaseController } from './controllers/AbstractBaseController'
import { OfficeController } from './controllers/OfficeController'
import { UserController } from './controllers/UserController'

class RouteManager {
	private controllers: BaseController[] = []

	add(c: BaseController) {
		this.controllers.push(c)
		return this
	}

	buildAllRoutes(): Record<string, any> {
		return Object.assign({}, ...this.controllers.map((instance) => instance.getRouteBindings()))
	}
}

export const routes = new RouteManager().add(new UserController()).add(new OfficeController()).buildAllRoutes()
