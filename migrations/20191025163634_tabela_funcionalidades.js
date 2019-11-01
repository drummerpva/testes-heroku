exports.up = function(knex) {
  return knex.schema.createTable('funcionalidades', table => {
    table.engine('innodb');
    table.increments('id').primary();
    table.string('nome', 50).notNull();
    table.string('tag', 30).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('funcionalidades');
};
