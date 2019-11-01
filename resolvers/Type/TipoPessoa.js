const db = require('../../config/db');

module.exports = {
  integrantes(tipo_pessoa) {
    if (tipo_pessoa.id === 1)
      return db('clientes')
        .select()
        .where({ tipo_pessoa_id: tipo_pessoa.id, status: '1' });
    else if (tipo_pessoa.id === 2)
      return db('vendedores')
        .select()
        .where({ tipo_pessoa_id: tipo_pessoa.id, status: '1' });
    else if (tipo_pessoa.id === 3)
      return db('funcionarios')
        .select()
        .where({ tipo_pessoa_id: tipo_pessoa.id, status: '1' });
    else if (tipo_pessoa.id === 4)
      return db('fornecedores')
        .select()
        .where({ tipo_pessoa_id: tipo_pessoa.id, status: '1' });
  },
};
