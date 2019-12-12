exports.up = function(knex) {
  return knex.schema.createTable('setores', table => {
    table.engine('innodb');
    table.increments('id').primary();
    table.string('nome', 50).notNull();
    table.string('status', 1).defaultTo('1');
    table.timestamps(true, true);
  }).then(() => {
    return knex('setores').insert([
      {nome: 'ADMINISTRAÇÃO'}
    ]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('setores');
};
