const db = require('../../config/db');

module.exports = {
  tiposPessoas(_, __, ctx) {
    ctx && ctx.validarLogado();
    return db('tipos_pessoas')
      .select()
      .where({ status: '1' });
  },
};
