import { serve } from 'bun'
import index from './view/index.html'
import { UserController } from './controllers/UserController'
import { routes } from './router'

const server = serve({
	routes: {
		// Serve index.html for all unmatched routes.
		'/*': index,
		...routes,
	},

	development: process.env.NODE_ENV !== 'production',
})

console.log(`🚀 Server running at ${server.url}`)
