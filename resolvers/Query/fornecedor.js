const db = require('../../config/db');

module.exports = {
  fornecedores(_, { filtro }, ctx) {
    ctx && ctx.validarAdmin();
    if (!filtro) return db('fornecedores').select();
    return filtro.nome
      ? db('fornecedores')
          .select()
          .where('nome', 'like', `%${filtro.nome}%`)
          .andWhere({ status: '1' })
      : filtro.cpf_cnpj
      ? db('fornecedores')
          .select()
          .where({ cpf_cnpj: filtro.cpf_cnpj, status: '1' })
      : db('fornecedores')
          .select()
          .where({ status: '1' });
  },
  fornecedor(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    return id
      ? db('fornecedores')
          .select()
          .where({ id: id, status: '1' })
          .first()
      : null;
  },
};
