exports.up = function(knex) {
  return knex.schema.alterTable('permissoes', table => {
    table
      .integer('usuario_id')
      .unsigned()
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('funcionalidade_id')
      .unsigned()
      .references('id')
      .inTable('funcionalidades')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('permissoes', table => {
    table.dropForeign('usuario_id');
    table.dropForeign('funcionalidade_id');
    table.dropColumn('usuario_id');
    table.dropColumn('funcionalidade_id');
  });
};
