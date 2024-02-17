import HandlerPrototype from '../handlerPrototype.mjs'

export default class SomeHandler extends HandlerPrototype {
  constructor(data, connection) {
    super(data, connection)
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
