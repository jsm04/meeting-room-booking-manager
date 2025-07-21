import { BaseRoute } from './BaseRouter';

export class OfficeRoute extends BaseRoute {
	path = '/api/office';

	get routes() {
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
