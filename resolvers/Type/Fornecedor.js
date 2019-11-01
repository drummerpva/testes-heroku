const db = require('../../config/db');

module.exports = {
  tipoPessoa(fornecedor) {
    return db('tipos_pessoas')
      .select()
      .where({ id: fornecedor.tipo_pessoa_id })
      .first();
  },
  editable(fornecedor) {
    return 1;
  },
};
