import { AppSettings } from '../domain/AppSettings';
import { HTTPMethod, RouteObject } from '../types';

export abstract class BaseRoute {
	protected app_settings = AppSettings.getInstance().get();
	abstract path: string;
	abstract get routes(): RouteObject;
	protected add(s: string) {
		return this.path.endsWith('/') ? this.path + s : this.path + '/' + s;
	}
}
