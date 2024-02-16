import fastify from 'fastify'
import config from './modules/config.mjs'
import logger from './modules/logger.mjs'
import { OperationalError } from './modules/error.mjs'
const app = fastify()

app.register(import('@fastify/websocket'))
app.register(import('./modules/ws/controller.mjs'))
app.register(import('./modules/routes/login/controller.mjs'), {
  prefix: 'login',
})

app.listen({ port: config.port }, (err, address) => {
  if (err) console.error(err)
  logger.info(`Server listening on ${address}`)
})

process.on('uncaughtException', (err) => {
  logger.error(err)
  if (!(err instanceof OperationalError)) {
    process.exit(1)
  }
})
process.on('SIGTERM', async () => {
  logger.warn('SIGTERM received')
  await app.close()
  process.exit(0)
})
process.on('SIGINT', async () => {
  logger.warn('SIGINT received')
  await app.close()
  process.exit(0)
})

export default app
