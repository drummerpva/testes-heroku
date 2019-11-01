const db = require('../../config/db');

module.exports = {
  cores(_, { filtro }, ctx) {
    ctx && ctx.validarLogado();
    if (!filtro) return db('cores').select();
    return filtro.nome
      ? db('cores')
          .select()
          .where('nome', 'like', `%${filtro.nome}%`)
          .andWhere({ status: '1' })
      : db('cores')
          .select()
          .where({ status: '1' });
  },
  cor(_, { id }, ctx) {
    ctx && ctx.validarLogado();
    return id
      ? db('cores')
          .select()
          .where({ id: id, status: '1' })
          .first()
      : null;
  },
};
