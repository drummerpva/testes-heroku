exports.up = function(knex) {
  return knex.schema.createTable('cotacao_d', table => {
    table.engine('innodb');
    table.increments('id').primary();
    table.float('valor_unitario').notNull();
    table.float('quantidade').notNull();
    table.float('quantidade_calculo').notNull();
    table.float('peso_unitario');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cotacao_d');
};
