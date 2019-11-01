const db = require('../../config/db');

module.exports = {
  vendedores(_, { filtro }, ctx) {
    ctx && ctx.validarEmpresa();
    if (!filtro)
      return db('vendedores')
        .select()
        .where({ status: '1' });
    return filtro.nome
      ? db('vendedores')
          .select()
          .where('nome', 'like', `%${filtro.nome}%`)
          .andWhere({ status: '1' })
      : filtro.cpf_cnpj
      ? db('vendedores')
          .select()
          .where({ cpf_cnpj: filtro.cpf_cnpj, status: '1' })
      : db('vendedores')
          .select()
          .where({ status: '1' });
  },
  vendedor(_, { id }, ctx) {
    ctx && ctx.validarLogado();
    if (ctx.vendedor && parseInt(id) !== ctx.usuario.pessoa_id)
      throw new Error('Acesso Negado U!');
    return id
      ? db('vendedores')
          .select()
          .where({ id: id, status: '1' })
          .first()
      : null;
  },
};
