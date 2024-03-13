import db from '../db.mjs'
import { TablePrototype } from '../tablePrototype.mjs'

export default class GeoData extends TablePrototype {
	static tableName = 'geodata'
	static async write({ longitude, latitude, user_id }) {
			return await this.insert({
				geometry: db.raw(`point(${longitude}, ${latitude})`),
				user_id
			})
	}
}
