import MessageFabric from './messageFabric.mjs';
import Ajv from 'ajv';
const ajv = new Ajv();
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
  fastify.get('/', { websocket: true }, (connection) => {
    connection.socket.on('message', (message) => {
      const json = primaryValidation(message)
      if (!json) return connection.socket.send('wrong body')
      const targetObject = new MessageFabric(json, connection)
      const valid = targetObject.validate()
      if (!valid) return connection.socket.send('invalid json')
      targetObject.handle()
    })
  })
}