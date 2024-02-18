import MessageFabric from './messageFabric.mjs'
import { asyncStorageBinding } from 'src/modules/middlewares.mjs'
import { jwtGuard } from 'src/modules/guards.mjs'
import asyncLocalStorage from 'src/modules/async.mjs'
import schema from './schema.mjs'
import { createResponse, primaryValidation } from './wsUtils.mjs'
import classes from './classesLoader.mjs'

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
          return connection.socket.send(
            createResponse({ description: 'invalid message' }, true)
          )
        const targetObject = MessageFabric(json, context, connection)
        if (!targetObject)
          return connection.socket.send(
            createResponse(
              {
                description: `invalid message type: ${json.type}`,
                proposes: classes.map((c) => c.type),
              },
              true
            )
          )
        const valid = targetObject.validate()
        if (!valid)
          return connection.socket.send(
            createResponse(targetObject.createValidationErrorData(), true)
          )
        targetObject.handle()
      })
    }
  )
}
