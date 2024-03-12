import fastify from 'fastify'
import logger from './modules/logger.mjs'
import config from './config.mjs'
const app = fastify({
	logger,
})

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
	if (err) logger.error(err)
	logger.info(`Server listening on ${address}`)
})

process.on('uncaughtException', (err) => {
	logger.error(err)
	process.exit(1)
})
let stopping
process.once('SIGTERM', async () => {
	if (stopping) return
	stopping = true
	logger.warn('SIGTERM received')
	await app.close()
	process.exit(0)
})
process.once('SIGINT', async () => {
	if (stopping) return
	stopping = true
	logger.warn('SIGINT received')
	await app.close()
	process.exit(0)
})

export default app
