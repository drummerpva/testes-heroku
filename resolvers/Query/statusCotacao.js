const db = require('../../config/db');

module.exports = {
  statusCotacoes(_, { filtro }, ctx) {
    ctx && ctx.validarLogado();
    if (!filtro) return db('status_cotacao').select().where({status: '1'})
    return filtro.nome
      ? db('status_cotacao')
          .select()
          .where('nome', 'like', `%${filtro.nome}%`)
          .andWhere({ status: '1' })
      : db('status_cotacao')
          .select()
          .where({ status: '1' });
  },
  statusCotacao(_, { id }, ctx) {
    ctx && ctx.validarLogado();
    return id
      ? db('status_cotacao')
          .select()
          .where({ id: id, status: '1' })
          .first()
      : null;
  },
};
