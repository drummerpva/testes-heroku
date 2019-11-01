exports.up = function(knex) {
  return knex.schema.createTable('permissoes', table => {
    table.engine('innodb');
    table.increments('id').primary();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('permissoes');
};
