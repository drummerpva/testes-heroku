const db = require('../../config/db');

module.exports = {
  cotacoesC(_, { filtro }, ctx) {
    ctx.validarLogado();
    if (ctx.vendedor) {
      return db('cotacao_c')
        .select()
        .where({ status: '1', vendedor_id: ctx.usuario.pessoa_id })
        .orderBy('id', 'desc');
    }
    if (ctx.funcionario || ctx.admin) {
      return db('cotacao_c')
        .select()
        .where({ status: '1' })
        .orderBy('id', 'desc');
    }
    return [];
    /* if (!filtro)
      return db('cotacao_c')
        .select()
        .where({ status: '1' })
        .orderBy('id', 'desc');
    return filtro.data
      ? db('cotacao_c')
          .select()
          .where('data', 'like', `%${filtro.data}%`)
          .andWhere({ status: '1' })
          .orderBy('data', 'desc')
      : db('cotacao_c')
          .select()
          .where({ status: '1' })
          .orderBy('data', 'desc'); */
  },
  cotacaoC(_, { id }, ctx) {
    ctx && ctx.validarLogado();
    if (ctx.vendedor) {
      return id
        ? db('cotacao_c')
            .select()
            .where({ id: id, status: '1', vendedor_id: ctx.usuario.pessoa_id })
            .first()
        : null;
    }
    return id
      ? db('cotacao_c')
          .select()
          .where({ id: id, status: '1' })
          .first()
      : null;
  },
};
