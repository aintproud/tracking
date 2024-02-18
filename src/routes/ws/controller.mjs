import MessageFabric from './messageFabric.mjs'
import { asyncStorageBinding } from 'src/modules/middlewares.mjs'
import { jwtGuard } from 'src/modules/guards.mjs'
import asyncLocalStorage from 'src/modules/async.mjs'
import schema from './schema.mjs'
import { createResponse, primaryValidation } from './wsUtils.mjs'

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
        const json = primaryValidation(message)
        if (!json)
          return connection.socket.send(createResponse('invalid data', true))
        const targetObject = new MessageFabric(json, context, connection)
        const valid = targetObject.validate()
        if (!valid)
          return connection.socket.send(createResponse('invalid data', true))
        targetObject.handle()
      })
    }
  )
}
