const db = require('../../config/db');

module.exports = {
  funcionarios(_, { filtro }, ctx) {
    ctx && ctx.validarAdmin();
    if (!filtro) return db('funcionarios').select();
    return filtro.nome
      ? db('funcionarios')
          .select()
          .where('nome', 'like', `%${filtro.nome}%`)
          .andWhere({ status: '1' })
      : filtro.cpf_cnpj
      ? db('funcionarios')
          .select()
          .where({ cpf_cnpj: filtro.cpf_cnpj, status: '1' })
      : db('funcionarios')
          .select()
          .where({ status: '1' });
  },
  funcionario(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    return id
      ? db('funcionarios')
          .select()
          .where({ id: id, status: '1' })
          .first()
      : null;
  },
};
