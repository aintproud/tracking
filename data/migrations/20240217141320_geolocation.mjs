export const up = async (knex) => {
  return knex.schema.createTable('geodata', (table) => {
    table.increments('id').primary()
    table.point('geometry').notNullable()
    // table.integer('height').notNullable()
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now())
    table.integer('user_id').unsigned().references('id').inTable('users')
  })
}
export const down = async (knex) => {
  return knex.schema.dropTable('geodata')
}
