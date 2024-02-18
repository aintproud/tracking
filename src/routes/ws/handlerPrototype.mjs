import Ajv from 'ajv'
const ajv = new Ajv()

export default class HandlerPrototype {
  constructor(data, context, connection, schema) {
    this.data = data
    this.context = context
    this.connection = connection
    this.schema = schema
  }
  validate() {
    return ajv.validate(this.schema, this.data)
  }
}