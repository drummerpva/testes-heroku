const db = require('../../config/db');
// const { usuario: obterUsuario } = require('../Query/usuario');
// const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoVendedor(_, { dados }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const existe = await db('vendedores')
        .where({ cpf_cnpj: dados.cpf_cnpj, status: '1' })
        .first();
      if (existe) throw new Error('CPF/CNPJ já cadastrado, tente novamente');
      const [id] = await db('vendedores').insert({
        ...dados,
        comissao: parseFloat(dados.comissao),
        min_valor_kg: parseFloat(dados.min_valor_kg),
      });
      return await db('vendedores')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarVendedor(_, { id, dados }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const vendedor = await db('vendedores')
        .select()
        .where({ id, status: '1' })
        .first();

      if (!vendedor) throw new Error('Vendedor não cadastrado');
      const verifica = await db('vendedores')
        .select()
        .where({ cpf_cnpj: dados.cpf_cnpj, status: '1' })
        .andWhere(function() {
          this.whereNot({ id });
        })
        .first();
      if (verifica) throw new Error('CPF/CNPJ já cadastrado, tente novamente');
      await db('vendedores')
        .where({ id })
        .update({ ...dados });
      return db('vendedores')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirVendedor(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const cliente = await db('vendedores')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!cliente) throw new Error('Vendedor não cadastrado');
      await db('vendedores')
        .where({ id })
        .update({ status: '2' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
