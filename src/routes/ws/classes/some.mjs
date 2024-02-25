import HandlerPrototype from 'src/modules/ws/handlerPrototype.mjs'

export default class SomeHandler extends HandlerPrototype {
	static type = 'some'
	static schema = {
		type: 'object',
		properties: {
			key: { type: 'string' },
		},
		required: ['key'],
		additionalProperties: false,
	}
	constructor(data, context, connection) {
		super(data, context, connection)
	}
	handle() {
		this.connection.socket.send(`success: ${JSON.stringify(this.data)}`)
	}
}
