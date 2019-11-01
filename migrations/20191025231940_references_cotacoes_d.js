exports.up = function(knex) {
  return knex.schema.alterTable('cotacao_d', table => {
    table
      .integer('cotacao_cabecalho_id')
      .unsigned()
      .references('cotacao_c.id')
      .onDelete('CASCADE')
      .onUpdate('NO ACTION');
    table
      .integer('produto_id')
      .unsigned()
      .references('produtos.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
    table
      .integer('cor_id')
      .unsigned()
      .references('cores.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('cotacao_d', table => {
    table.dropForeign('cotacao_cabecalho_id');
    table.dropForeign('produto_id');
    table.dropForeign('cor_id');
    table.dropColumn('cotacao_cabecalho_id');
    table.dropColumn('produto_id');
    table.dropColumn('cor_id');
  });
};
