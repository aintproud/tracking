import { createHash } from 'src/modules/utils.mjs'
import { TablePrototype } from '../tablePrototype.mjs'
import { verifyHash } from 'src/modules/utils.mjs'
import OperationalError from 'src/modules/errors.mjs'

export default class User extends TablePrototype {
	static tableName = 'users'
	static async register({ name, email, password }) {
		const exists = await this.table.where({ email }).orWhere({ name })
		if (exists.length > 0)
			throw new OperationalError('User already exists', 409)
		const password_hash = await createHash(password)
		return this.table.insert({ name, email, password_hash }).returning('*')
	}
	static async login({ email, password }) {
		const user = await this.find({ email })
		if (!user || !(await verifyHash(password, user.password_hash)))
			throw new OperationalError('Wrong email or password', 401)
		return user
	}
}
