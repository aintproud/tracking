import { createHash } from 'src/modules/utils.mjs'
import { TablePrototype } from '../tablePrototype.mjs'
import {verifyHash} from 'src/modules/utils.mjs';

export default class User extends TablePrototype {
	static tableName = 'users'
	static async register ({name, email, password}){
		const exists = await this.table.where({ email }).orWhere({ name })
		if (exists.length > 0) return false
		const password_hash = await createHash(password)
		return this.table
			.insert({name, email, password_hash })
			.returning('*')
	}
	static async login ({email, password}){
		const user = await this.find({ email })
		if (!user || !(await verifyHash(password, user.password_hash))) return false
		return user
	}
}
