const db = require('../../config/db');

module.exports = {
  clientes(vendedor) {
    return db('clientes')
      .select()
      .where({ vendedor_id: vendedor.id, status: '1' });
  },
  tipoPessoa(vendedor) {
    return db('tipos_pessoas')
      .select()
      .where({ id: vendedor.tipo_pessoa_id })
      .first();
  },
  editable(vendedor) {
    return 1;
  },
};
