const db = require('../../config/db');

module.exports = {
  vendedor(cotacao) {
    return db('vendedores')
      .select()
      .where({ id: cotacao.vendedor_id })
      .first();
  },
  cliente(cotacao) {
    return db('clientes')
      .select()
      .where({ id: cotacao.cliente_id })
      .first();
  },
  andamento(cotacao) {
    return db('status_cotacao')
      .select()
      .where({ id: cotacao.status_cotacao_id })
      .first();
  },
  produtos(cotacao) {
    return db('cotacao_d')
      .select()
      .where({ cotacao_cabecalho_id: cotacao.id });
  },
  valor_total(cotacao) {
    const {
      valor_produtos,
      valor_frete,
      valor_imposto,
      valor_adicional,
    } = cotacao;
    const vTotal =
      parseFloat(valor_produtos || 0) +
      parseFloat(valor_frete || 0) +
      parseFloat(valor_imposto || 0) +
      parseFloat(valor_adicional || 0);

    return parseFloat(vTotal);
  },
  valor_total_desconto(cotacao) {
    const {
      valor_produtos,
      valor_frete,
      valor_imposto,
      valor_adicional,
      porcentagem_desconto,
    } = cotacao;
    const vTotal =
      parseFloat(valor_produtos || 0) +
      parseFloat(valor_frete || 0) +
      parseFloat(valor_imposto || 0) +
      parseFloat(valor_adicional || 0);
    const desconto =
      vTotal && vTotal * (parseFloat(porcentagem_desconto || 0) / 100);
    return vTotal - desconto;
  },
  editable(cotacaoC, __, ctx) {
    if (ctx.admin) return 0;
    if (
      parseInt(cotacaoC.status_cotacao_id) === 1 ||
      parseInt(cotacaoC.status_cotacao_id) === 10
    )
      return 1;
    return 0;
  },
  data(cotacao) {
    const d = new Date(+cotacao.data);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  },
};
