import { BaseRoute } from './BaseRouter';

export class OfficeRoute extends BaseRoute {
	path = '/api/office';

	/* 	Public */

	get routes() {
		return {
			[this.add('hello')]: {
				GET: this.helloWorld,
			},
		};
	}

	/* 	Private */

	/* 	Methods */

	helloWorld = async () => {
		return Response.json({
			message: 'Hello, world from Office route!',
			method: 'GET',
		});
	};
}
