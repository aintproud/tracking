import Ajv from 'ajv'
const ajv = new Ajv()

export default class HandlerPrototype {
  static get type() {
    throw new Error('The type must be defined for the model.')
  }
  constructor(data, context, connection, schema) {
    this.data = data
    this.context = context
    this.connection = connection
    this.schema = schema
  }
  get errors() {
    return {
      validation: {
        description: `invalid type data format for type: ${this.constructor.type}`,
        schema: this.schema,
        recieved: this.data,
      }
    }
  }
  validate() {
    return ajv.validate(this.schema, this.data)
  }
}