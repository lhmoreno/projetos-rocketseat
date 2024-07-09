import { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').index().notNullable()
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.timestamp('doned_at').notNullable()
    table.boolean('is_on_the_diet').notNullable()

    table.foreign('user_id').references('users.id')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
