exports.up = function(knex) {
  return knex.schema
    .createTable('tipos_pessoas', table => {
      table.engine('innodb');
      table.increments('id').primary();
      table.string('nome', 30).notNull();
      table.string('status', 1).defaultTo('1');
      table.timestamps(true, true);
    })
    .then(() => {
      return knex('tipos_pessoas').insert([
        { nome: 'CLIENTE' },
        { nome: 'VENDEDOR' },
        { nome: 'FUNCIONARIO' },
        { nome: 'FORNECEDOR' },
        { nome: 'ADMINISTRADOR' },
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tipos_pessoas');
};
