import { asyncStorageBinding } from 'src/modules/middlewares.mjs'
import { jwtGuard } from 'src/modules/guards.mjs'
import asyncLocalStorage from 'src/modules/async.mjs'
import schema from './schema.mjs'
import RunTime from './websocket_logic/runtime.mjs'
import logger from 'src/modules/logger.mjs'
import { createResponse } from 'src/modules/utils.mjs'

/**  @type {import('fastify').FastifyPluginAsync<>} */
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
        try{
          const runTime = new RunTime(message, context, connection)
          runTime.run()
        } catch (e) {
          logger.error(e)
          connection.socket.send(
            createResponse({ description: 'something wrong with server' }, true)
          )
        }
      })
    }
  )
}
