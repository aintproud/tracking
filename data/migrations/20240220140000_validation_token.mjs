/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
	return knex.schema.createTable('validation_token', (table) => {
		table.integer('user_id').unsigned().references('id').inTable('users')
		table.string('token')
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
	return knex.schema.dropTable('validation_token')
}
