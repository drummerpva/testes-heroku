const db = require('../../config/db');

module.exports = {
  integrantes(setor) {
    return db('funcionarios')
      .select()
      .where({ setor_id: setor.id, status: '1' });
  },
  editable(setor) {
    return 1;
  },
};
