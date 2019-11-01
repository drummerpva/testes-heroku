const db = require('../../config/db');

module.exports = {
  setor(funcionario) {
    return db('setores')
      .select()
      .where({ id: funcionario.setor_id, status: '1' })
      .first();
  },
  editable(funcionario) {
    return 1;
  },
};
