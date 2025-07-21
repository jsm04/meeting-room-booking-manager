import { serve } from 'bun';
import index from './view/index.html';
import { UserRoute } from './routes/UserRouter';

const userRoute = new UserRoute().routes;

const server = serve({
	routes: {
		// Serve index.html for all unmatched routes.
		'/*': index,
		...userRoute,
	},

	development: process.env.NODE_ENV !== 'production',
});

console.log(`🚀 Server running at ${server.url}`);
