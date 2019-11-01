exports.up = function(knex) {
  return knex.schema.createTable('cotacao_c', table => {
    table.engine('innodb');
    table.increments('id').primary();
    table.date('data').notNull();
    table.date('data_entrega');
    table.float('valor_produtos');
    table.float('valor_frete');
    table.float('valor_imposto');
    table.float('valor_adicional');
    table.float('valor_por_quilo');
    table.float('porcentagem_desconto', 4, 2);
    table.float('peso_total');
    table.string('forma_pagamento', 1);
    table.integer('comissao');
    table.string('solicitar_aprovacao');
    table.text('obs');
    table.string('status', 1).defaultTo('1');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cotacao_c');
};
