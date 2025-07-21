import { BaseRoute } from './BaseRouter';

export class UserRoute extends BaseRoute {
	path = '/api/users';

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
			message: 'Hello, world from User route!',
			method: 'GET',
		});
	};
}
