exports.up = function(knex) {
  return knex.schema.createTable('usuarios', table => {
    table.engine('innodb');
    table.increments('id').primary();
    table.integer('pessoa_id').notNull();
    table.string('email', 100).notNull();
    table.string('senha').notNull();
    table.text('obs');
    table.string('status', 1).defaultTo('C');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};
