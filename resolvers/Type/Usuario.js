const db = require('../../config/db');

module.exports = {
  pessoa(usuario) {
    if (usuario.tipo_pessoa_id === 1)
      return db('clientes')
        .select()
        .where({ id: usuario.pessoa_id, status: '1' })
        .first();
    else if (usuario.tipo_pessoa_id === 2)
      return db('vendedores')
        .select()
        .where({ id: usuario.pessoa_id, status: '1' })
        .first();
    else if (usuario.tipo_pessoa_id === 3)
      return db('funcionarios')
        .select()
        .where({ id: usuario.pessoa_id, status: '1' })
        .first();
    else if (usuario.tipo_pessoa_id === 4)
      return db('fornecedores')
        .select()
        .where({ id: usuario.pessoa_id, status: '1' })
        .first();
    else if (usuario.tipo_pessoa_id === 5)
      return db('funcionarios')
        .select()
        .where({ id: usuario.pessoa_id, status: '1' })
        .first();
  },
  tipoPessoa(usuario) {
    return db('tipos_pessoas')
      .select()
      .where({ id: usuario.tipo_pessoa_id })
      .first();
  },
  editable(usuario) {
    return usuario.tipo_pessoa_id === 5 ? 0 : 1;
  },
};
