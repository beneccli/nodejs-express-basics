
exports.up = function(knex) {
  return knex.schema
  .createTable('oauth_providers', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
  })
  .createTable('users', (table) => {
    table.increments().primary();
    table.string('email').unique();
    table.string('username');
    table.string('picture');
    table.boolean('admin').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').defaultTo(null);
  })
  .createTable('oauth_providers_users', (table) => {
    table.increments('id').primary();
    table.integer('provider_id').notNullable();
    table.string('provider_user_id').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.foreign('provider_id').references('id').inTable('oauth_providers').onDelete('CASCADE');;
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');;
  })
  ;
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('oauth_providers_users')
  .dropTable('users')
  .dropTable('oauth_providers')
  ;
};
