const db = require('../../config/db');
// const { usuario: obterUsuario } = require('../Query/usuario');
// const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoSetor(_, { dados }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const existe = await db('setores')
        .where({ nome: dados.nome, status: '1' })
        .first();
      if (existe) throw new Error('Setor já cadastrado, tente novamente');
      const [id] = await db('setores').insert({ ...dados });
      return await db('setores')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarSetor(_, { id, dados }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const setor = await db('setores')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!setor) throw new Error('Setor não cadastrado');
      const verifica = await db('setores')
        .select()
        .where({ nome: dados.nome, status: '1' })
        .andWhere(function() {
          this.whereNot({ id });
        })
        .first();
      if (verifica) throw new Error('Setor já cadastrado, tente novamente');
      await db('setores')
        .where({ id })
        .update({ ...dados });
      return db('setores')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirSetor(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const cliente = await db('setores')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!cliente) throw new Error('Setor não cadastrado');
      await db('setores')
        .where({ id })
        .update({ status: '2' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
