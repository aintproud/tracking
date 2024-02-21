
export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('geodata').del();
  // Inserts seed entries
  await knex('geodata').insert([
    {
      user_id: (await knex('users').select('id').first()).id, geometry: knex.raw(`point(1,1)`)
    }
  ]);
};
