const db = require('../../config/db');
// const { usuario: obterUsuario } = require('../Query/usuario');
// const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoProduto(_, { dados }, ctx) {
    ctx && ctx.validarFuncionario();
    try {
      const existe = await db('produtos')
        .where({ nome: dados.nome, status: '1' })
        .first();
      if (existe) throw new Error('Nome já cadastrada, tente novamente');
      const [id] = await db('produtos').insert({ ...dados });
      return await db('produtos')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarProduto(_, { id, dados }, ctx) {
    ctx && ctx.validarFuncionario();
    try {
      const produto = await db('produtos')
        .select()
        .where({ id, status: '1' })
        .first();

      if (!produto) throw new Error('Produto não cadastrado');
      const verifica = await db('produtos')
        .select()
        .where({ nome: dados.nome, status: '1' })
        .andWhere(function() {
          this.whereNot({ id });
        })
        .first();
      if (verifica) throw new Error('Nome já cadastrado, tente novamente');
      await db('produtos')
        .where({ id })
        .update({ ...dados });
      return db('produtos')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirProduto(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const cliente = await db('produtos')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!cliente) throw new Error('Produto não cadastrado');
      await db('produtos')
        .where({ id })
        .update({ status: '2' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
