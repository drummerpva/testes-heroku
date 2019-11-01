exports.up = function(knex) {
  return knex.schema.alterTable('usuarios', table => {
    table
      .integer('tipo_pessoa_id')
      .unsigned()
      .references('tipos_pessoas.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('usuarios', table => {
    table.dropForeign('tipo_pessoa_id');
    table.dropColumn('tipo_pessoa_id');
  });
};
