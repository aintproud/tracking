import HandlerPrototype from '../handlerPrototype.mjs'

export default class SomeHandler extends HandlerPrototype {
  constructor(data, context, connection) {
    super(data, connection)
    this.context = context
    this.schema = {
      type: 'object',
      properties: {
        key: { type: 'string' },
      },
      required: ['key'],
      additionalProperties: false,
    }
  }
  handle() {
    this.connection.socket.send(`success: ${JSON.stringify(this.data)}`)
  }
}
