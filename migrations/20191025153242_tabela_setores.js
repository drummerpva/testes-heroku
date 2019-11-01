exports.up = function(knex) {
  return knex.schema.createTable('setores', table => {
    table.engine('innodb');
    table.increments('id').primary();
    table.string('nome', 50).notNull();
    table.string('status', 1).defaultTo('1');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('setores');
};
