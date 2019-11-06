exports.up = function(knex) {
  return knex.schema
    .alterTable('funcionarios', table => {
      table
        .integer('setor_id')
        .unsigned()
        .references('setores.id')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION');
      table
        .integer('tipo_pessoa_id')
        .unsigned()
        .notNullable()
        .references('tipos_pessoas.id')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
        .defaultTo(3);
    })
    .then(() => {
      return knex('funcionarios').insert([
        {
          nome: 'ADMINISTRADOR',
          fantasia: 'ADMIN',
          cpf_cnpj: '00000000000',
          cidade: 'ADMIN',
          uf: 'SC',
          setor_id: 1,
          tipo_pessoa_id: 5,
        },
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.alterTable('funcionarios', table => {
    table.dropForeign('setor_id');
    table.dropForeign('tipo_pessoa_id');
    table.dropColumn('setor_id');
    table.dropColumn('tipo_pessoa_id');
  });
};
