const db = require('../../config/db');

module.exports = {
  produto(cotacao) {
    return db('produtos')
      .select()
      .where({ id: cotacao.produto_id })
      .first();
  },
  cor(cotacao) {
    return db('cores')
      .select()
      .where({ id: cotacao.cor_id })
      .first();
  },
  peso_total(cotacao) {
    return cotacao.quantidade_calculo * cotacao.peso_unitario;
  },
  valor_total(cotacao) {
    return cotacao.quantidade_calculo * cotacao.valor_unitario;
  },
};
