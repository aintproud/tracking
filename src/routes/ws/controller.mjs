import { asyncStorageBinding } from 'src/modules/middlewares.mjs'
import { jwtGuard } from 'src/modules/guards.mjs'
import asyncLocalStorage from 'src/modules/async.mjs'
import schema from './schema.mjs'
import RunTime from './runtime.mjs'
export default async function (fastify) {
  fastify.get(
    '/',
    {
      websocket: true,
      schema,
      preHandler: [asyncStorageBinding, jwtGuard],
    },
    (connection) => {
      const context = asyncLocalStorage.getStore()
      connection.socket.on('message', (message) => {
        const runTime = new RunTime(message, context, connection)
        runTime.run()
      })
    }
  )
}
