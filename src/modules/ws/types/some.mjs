import Ajv from 'ajv'
const ajv = new Ajv()

export default class SomeHandler {
  constructor(data, connection) {
    this.data = data
    this.connection = connection
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
