import { BaseController } from './BaseController';

export class UserController extends BaseController {
	path = '/api/users';

	getRouteBindings() {
		return {
			[this.add('hello')]: {
				GET: this.helloWorld,
			},
		};
	}

	helloWorld = async () => {
		return Response.json({
			message: 'Hello, world from User route!',
			method: 'GET',
		});
	};
}
