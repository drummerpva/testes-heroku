exports.up = function(knex) {
  return knex.schema.createTable('produtos', table => {
    table.engine('innodb');
    table.increments('id').primary();
    table.string('referencia', 70);
    table.string('nome', 50).notNull();
    table.string('unidade', 5).notNull();
    table.float('quantidade', 4, 2);
    table.float('quantidade_calculo', 4, 2).notNull();
    table.float('valor');
    table.float('peso', 4, 2).notNull();
    table.string('status', 1).defaultTo('1');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos');
};
