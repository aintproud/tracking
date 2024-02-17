import Ajv from 'ajv'
import MessageFabric from './messageFabric.mjs'
import { asyncStorageBinding } from 'src/modules/middlewares.mjs'
import { jwtGuard } from 'src/modules/guards.mjs'
import asyncLocalStorage from 'src/modules/async.mjs'
const ajv = new Ajv()
function primaryValidation(message) {
  try {
    const json = JSON.parse(message)
    const valid = ajv.validate(
      {
        type: 'object',
        properties: {
          type: { type: 'string' },
          data: { type: 'object' },
        },
        required: ['type', 'data'],
        additionalProperties: false,
      },
      json
    )
    return !valid || json
  } catch (e) {
    return false
  }
}

export default async function (fastify) {
  fastify.get(
    '/',
    {
      websocket: true,
      preHandler: [asyncStorageBinding, jwtGuard],
    },
    (connection) => {
      const context = asyncLocalStorage.getStore()
      connection.socket.on('message', (message) => {
        const json = primaryValidation(message)
        if (!json) return connection.socket.send('invalid json')
        const targetObject = new MessageFabric(json, context, connection)
        const valid = targetObject.validate()
        if (!valid) return connection.socket.send('invalid data')
        targetObject.handle()
      })
    }
  )
}
