const db = require('../../config/db');

module.exports = {
  vendedor(cliente) {
    return db('vendedores')
      .select()
      .where({ id: cliente.vendedor_id })
      .first();
  },
  tipoPessoa(cliente) {
    return db('tipos_pessoas')
      .select()
      .where({ id: cliente.tipo_pessoa_id })
      .first();
  },
  editable(cliente) {
    return 1;
  },
  simples(cliente) {
    return cliente.regime;
  },
  verificado(cliente) {
    return '0';
  },
};
