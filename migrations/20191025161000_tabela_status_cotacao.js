exports.up = function(knex) {
  return knex.schema
    .createTable('status_cotacao', table => {
      table.engine('innodb');
      table.increments('id').primary();
      table.string('nome', 30).notNull();
      table.string('status', 1).defaultTo('1');
      table.timestamps(true, true);
    })
    .then(() => {
      return knex('status_cotacao').insert([
        { nome: 'DIGITADA' },
        { nome: 'SOLICITADA' },
        { nome: 'CONFIRMADA' },
        { nome: 'EM PRODUÇÃO' },
        { nome: 'CARREGADO' },
        { nome: 'EM TRANSPORTE' },
        { nome: 'ENTREGUE-PAGO' },
        { nome: 'ENTREGUE-COBRAR' },
        { nome: 'FINALIZADA' },
        { nome: 'SOLICITADA APROVAÇÃO' },
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('status_cotacao');
};
