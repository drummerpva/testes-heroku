const db = require('../../config/db');

module.exports = {
  produtos(_, { filtro }, ctx) {
    ctx && ctx.validarLogado();
    if (!filtro) return db('produtos').select();
    return filtro.nome
      ? db('produtos')
          .select()
          .where('nome', 'like', `%${filtro.nome}%`)
          .andWhere({ status: '1' })
      : filtro.referencia
      ? db('produtos')
          .select()
          .where({ referencia: filtro.referencia, status: '1' })
      : db('produtos')
          .select()
          .where({ status: '1' });
  },
  produto(_, { id }, ctx) {
    ctx && ctx.validarLogado();
    return id
      ? db('produtos')
          .select()
          .where({ id: id, status: '1' })
          .first()
      : null;
  },
};
