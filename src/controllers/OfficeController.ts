import { BaseController } from './BaseController';

export class OfficeController extends BaseController {
	path = '/api/office';

	getRouteBindings() {
		return {
			[this.add('hello')]: {
				GET: this.helloWorld,
			},
		};
	}

	helloWorld = async () => {
		return Response.json({
			message: 'Hello, world from Office route!',
			method: 'GET',
		});
	};
}
