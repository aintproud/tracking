import Ajv from 'ajv'
import MessageFabric from './messageFabric.mjs'
import classes from './classesLoader.mjs'
import { createResponse } from './wsUtils.mjs'
const ajv = new Ajv()

export default class RunTime {
  constructor(message, context, connecion) {
    this.context = context
    this.connecion = connecion
    this.message = message
    this.primarySchema = {
      type: 'object',
      properties: {
        type: { type: 'string' },
        data: { type: 'object' },
      },
      required: ['type', 'data'],
      additionalProperties: false,
    }
  }
  primaryValidation(message) {
    try {
      const json = JSON.parse(message)
      const valid = ajv.validate(this.primarySchema, json)
      return !valid || json
    } catch (e) {
      return false
    }
  }
  createPrimaryValidationErrorData() {
    return {
      description: 'invalid message format',
      schema: this.primarySchema,
      recieved: this.message,
    }
  }
  createWrongTypeErrorData() {
    return {
      description: `invalid message type: ${this.json.type}`,
      proposes: classes.map((c) => c.type),
    }
  }
  run() {
    this.json = this.primaryValidation(this.message)
    if (!this.json)
      return this.connecion.socket.send(
        createResponse(this.createPrimaryValidationErrorData(), true)
      )
    const handler = MessageFabric(this.json, this.context, this.connecion)
    if (!handler)
      return this.connecion.socket.send(
        createResponse(this.createWrongTypeErrorData(), true)
      )
    const valid = handler.validate()
    if (!valid)
      return this.connecion.socket.send(
        createResponse(handler.createValidationErrorData(), true)
      )
    handler.handle()
  }
}
