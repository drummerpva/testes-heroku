exports.up = function(knex) {
  return knex.schema
    .alterTable('usuarios', table => {
      table
        .integer('tipo_pessoa_id')
        .unsigned()
        .references('tipos_pessoas.id')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION');
    })
    .then(() => {
      return knex.insert('usuarios').insert([
        {
          pessoa_id: 1,
          email: 'admin@admin.com',
          senha: '$2a$10$JLhnSs4SWrLw3OylAwZIEOUq76DHMwxLy11b7wpBklomD8IvpHu.e',
          obs: 'ADMIN DO SISTEMA CRIADO AUTOMATICAMENTE',
          tipo_pessoa_id: 5,
        },
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.alterTable('usuarios', table => {
    table.dropForeign('tipo_pessoa_id');
    table.dropColumn('tipo_pessoa_id');
  });
};
