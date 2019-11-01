exports.up = function(knex) {
  return knex.schema.alterTable('cotacao_c', table => {
    table
      .integer('vendedor_id')
      .unsigned()
      .references('vendedores.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
    table
      .integer('cliente_id')
      .unsigned()
      .references('clientes.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
    table
      .integer('status_cotacao_id')
      .unsigned()
      .references('status_cotacao.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION')
      .defaultTo(1);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('cotacao_c', table => {
    table.dropForeign('vendedor_id');
    table.dropForeign('cliente_id');
    table.dropForeign('status_cotacao_id');
    table.dropColumn('vendedor_id');
    table.dropColumn('cliente_id');
    table.dropColumn('status_cotacao_id');
  });
};
