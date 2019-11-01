const db = require('../../config/db');
// const { usuario: obterUsuario } = require('../Query/usuario');
// const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoCotacaoC(_, { dados }, ctx) {
    ctx && ctx.validarVendedor();
    let produtos = [];
    if (dados.produtos) {
      produtos = dados.produtos;
      delete dados.produtos;
    }
    let totalProdutos = 0;
    let totalPeso = 0;
    if (produtos.length) {
      produtos.forEach(p => {
        totalProdutos +=
          parseFloat(p.quantidade_calculo || 0) *
          parseFloat(p.valor_unitario || 0);
        totalPeso +=
          parseFloat(p.quantidade_calculo || 0) *
          parseFloat(p.peso_unitario || 0);
      });
    }
    dados.valor_produtos = totalProdutos;
    dados.peso_total = totalPeso;
    dados.valor_por_quilo = produtos.length ? totalProdutos / totalPeso : 0;
    dados.data = new Date();
    dados.vendedor_id = ctx.usuario.pessoa_id;
    try {
      const [id] = await db('cotacao_c').insert({ ...dados });
      if (produtos.length) {
        produtos.forEach(async p => {
          await db('cotacao_d').insert({
            cotacao_cabecalho_id: id,
            ...p,
          });
        });
      }
      return await db('cotacao_c')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarCotacaoC(_, { id, dados }, ctx) {
    ctx && ctx.validarLogado();
    let produtos = [];
    if (dados.produtos) {
      produtos = dados.produtos;
      delete dados.produtos;
    }
    let totalProdutos = 0;
    let totalPeso = 0;
    if (produtos.length) {
      ctx && ctx.validarVendedor();
      produtos.forEach(p => {
        totalProdutos +=
          parseFloat(p.quantidade_calculo || 0) *
          parseFloat(p.valor_unitario || 0);
        totalPeso +=
          parseFloat(p.quantidade_calculo || 0) *
          parseFloat(p.peso_unitario || 0);
      });
      dados.valor_produtos = totalProdutos;
      dados.peso_total = totalPeso;
      dados.valor_por_quilo = produtos.length ? totalProdutos / totalPeso : 0;
    }
    try {
      const cotacaoC = await db('cotacao_c')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!cotacaoC) throw new Error('Cotaçao não cadastrado');
      if (produtos.length) {
        const verifica = await db('cotacao_c')
          .select('id')
          .where({ id, status: '1', vendedor_id: ctx.usuario.pessoa_id })
          .first();
        if (!verifica) throw new Error('Acesso Negado!');
        await db('cotacao_d')
          .del()
          .where({ cotacao_cabecalho_id: id });
        produtos.forEach(async p => {
          await db('cotacao_d').insert({
            cotacao_cabecalho_id: id,
            ...p,
          });
        });
      }

      await db('cotacao_c')
        .where({ id })
        .update({ ...dados });
      return db('cotacao_c')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirCotacaoC(_, { id }, ctx) {
    ctx && ctx.validarVendedor();
    try {
      const cotacaoC = await db('cotacao_c')
        .select()
        .where({
          id,
          status: '1',
          vendedor_id: ctx.usuario.pessoa_id,
          status_cotacao_id: 1,
        })
        .first();
      if (!cotacaoC)
        throw new Error('Não Permitido ou cotação não cadastrada!');
      await db('cotacao_c')
        .where({ id })
        .update({ status: '2' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
