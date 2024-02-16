import fastify from 'fastify'
const app = fastify()
app.register(import('@fastify/websocket'))
app.register(async (fastify) => {
  fastify.get('/', { websocket: true }, (connection) => {
    connection.socket.on('message', (message) => {
      const json = primaryValidation(message)
      if(!json) return connection.socket.send('not json')
      const targetObject = new MessageFabric(json, connection)
      const valid = targetObject.validate()
      if(!valid) return connection.socket.send('invalid json')
      targetObject.handle()
    })
  })
})

import Ajv from 'ajv'
const ajv = new Ajv()
class SomeHandler {
  constructor(data, connection) {
    this.connection = connection
    this.data = data
    this.schema = {
      type: 'object',
      properties: {
        key: { type: 'string' },
      },
      required: ['key'],
      additionalProperties: false,
    }
  }
  validate() {
    return ajv.validate(this.schema, this.data)
  }
  handle() {
    this.connection.socket.send(`success: ${JSON.stringify(this.data)}`)
  }
}

class MessageFabric {
  constructor (json, connection) {
    this.json = json
    this.connection = connection
    const router = {
      'some': SomeHandler
    }
    const {type, data} = json
    const targetClass = router[type] ? router[type] : SomeHandler
    return new targetClass(data, connection)
  }
}
function primaryValidation(message){
  let json
  try {
    json=JSON.parse(message)
    console.log(json);
  } catch (e) {
    return false
  }
  if(!json.type) return false
  if(!json.data) return false
  return json
}
function secondaryValidation(schema, data){
  return ajv.validate(schema, data)
}

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at: ${address}`)
})
export default app
