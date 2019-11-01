const db = require('../../config/db');

module.exports = {
  clientes(_, { filtro }, ctx) {
    if (ctx.vendedor) {
      return db('clientes')
        .select()
        .where({ status: '1', vendedor_id: ctx.usuario.pessoa_id });
    }
    if (ctx.funcionario || ctx.admin) {
      return db('clientes')
        .select()
        .where({ status: '1' });
    }

    return [];
    /*
    if (!filtro) return db('clientes').select();
    return filtro.nome
      ? db('clientes')
          .select()
          .where('nome', 'like', `%${filtro.nome}%`)
          .andWhere({ status: '1' })
      : filtro.cpf_cnpj
      ? db('clientes')
          .select()
          .where({ cpf_cnpj: filtro.cpf_cnpj, status: '1' })
      : db('clientes')
          .select()
          .where({ status: '1' }); */
  },
  cliente(_, { id }, ctx) {
    if (ctx.vendedor) {
      return id
        ? db('clientes')
            .select()
            .where({ id, status: '1', vendedor_id: ctx.usuario.pessoa_id })
            .first()
        : null;
    }
    if (ctx.funcionario || ctx.admin) {
      return id
        ? db('clientes')
            .select()
            .where({ id: id, status: '1' })
            .first()
        : null;
    }
    return null;
  },
};
