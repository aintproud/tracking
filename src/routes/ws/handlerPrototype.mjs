import Ajv from 'ajv'
const ajv = new Ajv()

export default class HandlerPrototype {
  constructor(data, connection) {
    this.data = data
    this.connection = connection
  }
  validate() {
    return ajv.validate(this.schema, this.data)
  }
}