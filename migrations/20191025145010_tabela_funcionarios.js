exports.up = function(knex) {
  return knex.schema.createTable('funcionarios', table => {
    table.engine('innodb');
    table.increments('id').primary();
    table.string('nome', 150).notNull();
    table.string('fantasia', 150);
    table.string('tipo', 1).defaultTo('F');
    table.string('cpf_cnpj', 25).notNull();
    table.string('ie', 25);
    table.string('regime', 1);
    table.string('endereco', 100);
    table.string('numero', 15);
    table.string('bairro', 70);
    table.string('complemento', 100);
    table.string('cidade', 70).notNull();
    table.string('uf', 2).notNull();
    table.string('cep', 15);
    table.string('fone_fixo', 25);
    table.string('fone_celular', 25);
    table.string('email', 100);
    table.text('obs');
    table.string('status', 1).defaultTo('1');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('funcionarios');
};
