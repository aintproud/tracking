import faker from 'faker'
import { createHash } from '../../src/modules/utils.mjs'

export const seed = async (knex) => {
	// Deletes ALL existing entries
	await knex('users').del()

	// Inserts seed entries using faker
	const users = []
	for (let i = 0; i < 10; i++) {
		users.push({
			name: faker.name.firstName(),
			email: faker.internet.email(),
			password_hash: await createHash('password'),
		})
	}
	await knex('users').insert(users)
}
