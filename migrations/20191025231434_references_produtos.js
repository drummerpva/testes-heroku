exports.up = function(knex) {
  return knex.schema.alterTable('produtos', table => {
    table
      .integer('funcionario_id')
      .unsigned()
      .references('funcionarios.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
    table
      .integer('ultimo_fornecedor_id')
      .unsigned()
      .references('fornecedores.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('produtos', table => {
    table.dropForeign('funcionario_id');
    table.dropForeign('ultimo_fornecedor_id');
    table.dropColumn('funcionario_id');
    table.dropColumn('ultimo_fornecedor_id');
  });
};
