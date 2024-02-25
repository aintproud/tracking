import db from './db.mjs'
export class TablePrototype {
	static schema
	static tableName
	static get table() {
		if (!this.tableName) {
			throw new Error('The table name must be defined for the model.')
		}
		return db(this.tableName)
	}
	static async insert(data) {
		const [result] = await this.table.insert(data).returning('*')
		return result
	}
	static async find(object) {
		return this.table.where(object).first()
	}
	static async delete(object) {
		return this.table.where(object).del()
	}
	static async update(object, data) {
		return this.table.where(object).update(data)
	}
	static async findAll(object) {
		return this.table.where(object)
	}
}
