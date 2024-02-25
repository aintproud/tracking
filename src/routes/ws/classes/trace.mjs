import GeoData from 'src/modules/db/models/geodata.mjs'
import HandlerPrototype from 'src/modules/ws/handlerPrototype.mjs'
import db from 'src/modules/db/db.mjs'
import { createResponse } from 'src/modules/utils.mjs'
import logger from 'src/modules/logger.mjs'

export default class TraceHandler extends HandlerPrototype {
	static type = 'trace'
	static schema = {
		type: 'object',
		properties: {
			latitude: {
				type: 'number',
				minimum: -90,
				maximum: 90,
			},
			longitude: {
				type: 'number',
				minimum: -180,
				maximum: 180,
			},
		},
		required: ['latitude', 'longitude'],
		additionalProperties: false,
	}
	constructor(data, context, connection) {
		super(data, context, connection)
	}
	async handle() {
		try {
			const { latitude, longitude } = this.data
			const res = await GeoData.insert({
				geometry: db.raw(`point(${longitude}, ${latitude})`),
				user_id: this.context.body.id,
			})
			return this.connection.socket.send(createResponse({ res }))
		} catch (error) {
			logger.error(error)
			return this.connection.socket.send(
				createResponse({ description: 'something wrong with database' }, true),
			)
		}
	}
}
