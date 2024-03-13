import fastify from 'fastify'
import logger from './modules/logger.mjs'
import config from './config.mjs'
import OperationalError from './modules/errors.mjs'
const app = fastify()

app.register(import('@fastify/swagger'), {
	swagger: {
		info: {
			title: 'Tracker api',
			description: 'API for handling position of people in space',
		},
		securityDefinitions: {
			bearerAuth: {
				type: 'apiKey',
				name: 'Authorization',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				in: 'header',
			},
		},
	},
})
app.register(import('@fastify/swagger-ui'), {
	routePrefix: '/docs',
	uiConfig: {
		docExpansion: 'list',
		deepLinking: false,
	},
})
app.register(import('@fastify/websocket'))
app.register(import('./routes/ws/controller.mjs'), {
	prefix: 'ws',
})
app.register(import('./routes/login/controller.mjs'), {
	prefix: 'login',
})
app.register(import('./routes/register/controller.mjs'), {
	prefix: 'register',
})

app.listen({ port: config.port }, (err, address) => {
	if (err) {
		logger.error(err)
		process.exit(1)
	}
	logger.info(`server listening on ${address}`)
})
app.setErrorHandler((error, req, res) => {
	logger.error(error)
	if (error instanceof OperationalError) {
		return res.status(error.httpCode).send(error.message)
	}
	return res.status(500).send('Something went wrong')
})
process.on('uncaughtException', (err) => {
	logger.error(err, 'uncaughtException')
	process.exit(1)
})
const stop = async () => {
	logger.warn('app closing')
	await app.close()
	process.exit(0)
}
process.once('SIGTERM', stop)
process.once('SIGINT', stop)
export default app
