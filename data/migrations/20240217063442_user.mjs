export const up = async (knex) => {
	return knex.schema.createTable('users', (table) => {
		table.increments('id').primary()
		table.string('name').notNullable()
		table.string('email').notNullable()
		table.string('password_hash').notNullable()
	})
}
export const down = async (knex) => {
	return knex.schema.dropTable('users')
}
