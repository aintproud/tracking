import Ajv from 'ajv'
import classes from './classesLoader.mjs'
import { createResponse } from 'src/modules/utils.mjs'
const ajv = new Ajv()

export default class RunTime {
  static primarySchema = {
    type: 'object',
    properties: {
      type: { type: 'string' },
      data: { type: 'object' },
    },
    required: ['type', 'data'],
    additionalProperties: false,
  }
  /**
   * @param {import('@fastify/websocket').SocketStream} connecion 
   */
  constructor(message, context, connecion) {
    this.context = context
    this.connecion = connecion
    this.message = message
  }
  get errors() {
    return {
      primaryValidation: {
        description: 'invalid message format',
        schema: this.constructor.primarySchema,
        recieved: this.json,
      },
      wrongType: {
        description: `invalid message type: ${this.json.type}`,
        proposes: classes.map((c) => c.type),
      },
    }
  }
  primaryValidation() {
    try {
      const json = JSON.parse(this.message)
      const valid = ajv.validate(this.constructor.primarySchema, json)
      return valid ? json : false
    } catch (e) {
      return false
    }
  }
  getHandler() {
    const TargetClass = classes.find(
      (Handler) => Handler.type === this.json.type
    )
    if (!TargetClass) return
    return new TargetClass(this.json.data, this.context, this.connecion)
  }
  run() {
    this.json = this.primaryValidation()
    if (!this.json)
      return this.connecion.socket.send(
        createResponse(this.errors.primaryValidation, true)
      )
    const handler = this.getHandler()
    if (!handler)
      return this.connecion.socket.send(
        createResponse(this.errors.wrongType, true)
      )
    const valid = handler.validate()
    if (!valid)
      return this.connecion.socket.send(
        createResponse(handler.errors.validation, true)
      )
    handler.handle()
  }
}
