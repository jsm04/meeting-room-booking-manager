import { AppManager } from '../domain/AppManager'
import { HTTPMethod, RouteObject } from '../types'

export abstract class BaseController {
	protected app_settings = AppManager.getInstance().state
	abstract path: string
	abstract getRouteBindings(): RouteObject
	protected add(s: string) {
		return this.path.endsWith('/') ? this.path + s : this.path + '/' + s
	}
}
