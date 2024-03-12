import Ajv from 'ajv'
import { createResponse } from 'src/modules/utils.mjs'
const ajv = new Ajv()

export default class Runtime {
	constructor(classes) {
		this.classes = classes
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
	get docs() {
		return `
***Message format***
${'```\n'}${JSON.stringify(this.primarySchema, null, '\t')}${'\n```'}
      
***Types schemas***
${'```\n'}${JSON.stringify(
			Object.fromEntries(this.classes.map((c) => [c.type, c.schema])),
			null,
			'\t',
		)}`
	}
	get errors() {
		return {
			primaryValidation: {
				description: 'invalid message format',
				schema: this.primarySchema,
				recieved: this.json,
			},
			wrongType: {
				description: `invalid message type: ${this.json.type}`,
				proposes: this.classes.map((c) => c.type),
			},
		}
	}
	primaryValidation(message) {
		try {
			const json = JSON.parse(message)
			const valid = ajv.validate(this.primarySchema, json)
			return valid ? json : false
		} catch (e) {
			return false
		}
	}
	getTargetClass() {
		return this.classes.find((Handler) => Handler.type === this.json.type)
	}
	run(message, context, connection) {
		this.json = this.primaryValidation(message)
		if (!this.json)
			return connection.socket.send(
				createResponse(this.errors.primaryValidation, true),
			)
		const targetClass = this.getTargetClass()
		if (!targetClass)
			return connection.socket.send(
				createResponse(this.errors.wrongType, true),
			)
		const handler = new targetClass(this.json.data, context, connection)
		const valid = handler.validate()
		if (!valid)
			return connection.socket.send(
				createResponse(handler.errors.validation, true),
			)
		handler.handle()
	}
}
