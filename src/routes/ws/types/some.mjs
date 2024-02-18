import HandlerPrototype from '../handlerPrototype.mjs'

export default class SomeHandler extends HandlerPrototype {
  static get type() {
    return 'some'
  }
  constructor(data, context, connection) {
    super(data, context, connection, {
      type: 'object',
      properties: {
        key: { type: 'string' },
      },
      required: ['key'],
      additionalProperties: false,
    })
  }
  handle() {
    this.connection.socket.send(`success: ${JSON.stringify(this.data)}`)
  }
}
