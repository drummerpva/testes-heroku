const db = require('../../config/db');

module.exports = {
  setores(_, { filtro }, ctx) {
    ctx && ctx.validarAdmin();
    if (!filtro)
      return db('setores')
        .select()
        .where({ status: '1' });
    return filtro.nome
      ? db('setores')
          .select()
          .where('nome', 'like', `%${filtro.nome}%`)
          .andWhere({ status: '1' })
      : db('setores')
          .select()
          .where({ status: '1' });
  },
  setor(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    return id
      ? db('setores')
          .select()
          .where({ id: id, status: '1' })
          .first()
      : null;
  },
};
