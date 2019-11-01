exports.up = function(knex) {
  return knex.schema.alterTable('vendedores', table => {
    table
      .integer('funcionario_id')
      .unsigned()
      .references('funcionarios.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
    table
      .integer('tipo_pessoa_id')
      .unsigned()
      .notNullable()
      .references('tipos_pessoas.id')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION')
      .defaultTo(2);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('vendedores', table => {
    table.dropForeign('funcionario_id');
    table.dropForeign('tipo_pessoa_id');
    table.dropColumn('funcionario_id');
    table.dropColumn('tipo_pessoa_id');
  });
};
