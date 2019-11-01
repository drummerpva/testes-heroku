const db = require('../../config/db');
// const { usuario: obterUsuario } = require('../Query/usuario');
// const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoCor(_, { dados }, ctx) {
    ctx && ctx.validarFuncionario();
    try {
      const existe = await db('cores')
        .where({ nome: dados.nome, status: '1' })
        .first();
      if (existe) throw new Error('Cor já cadastrado, tente novamente');
      const [id] = await db('cores').insert({ ...dados });
      return await db('cores')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarCor(_, { id, dados }, ctx) {
    ctx && ctx.validarFuncionario();
    try {
      const cor = await db('cores')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!cor) throw new Error('Cor não cadastrado');
      const verifica = await db('cores')
        .select()
        .where({ nome: dados.nome, status: '1' })
        .andWhere(function() {
          this.whereNot({ id });
        })
        .first();
      if (verifica) throw new Error('Cor já cadastrado, tente novamente');
      await db('cores')
        .where({ id })
        .update({ ...dados });
      return db('cores')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirCor(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const cliente = await db('cores')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!cliente) throw new Error('Cor não cadastrado');
      await db('cores')
        .where({ id })
        .update({ status: '2' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
