import Ajv from 'ajv'
const ajv = new Ajv()

export default class HandlerPrototype {
  static get type() {
    throw new Error('The type must be defined for the model.')
  }
  static get schema() {
    throw new Error('The schema must be defined for the model.')
  }
  /** @param {import('@fastify/websocket').SocketStream} connection */
  constructor(data, context, connection) {
    this.data = data
    this.context = context
    this.connection = connection
  }
  get errors() {
    return {
      validation: {
        description: `invalid type data format for type: ${this.constructor.type}`,
        schema: this.constructor.schema,
        recieved: this.data,
      },
    }
  }
  validate() {
    return ajv.validate(this.constructor.schema, this.data)
  }
}
