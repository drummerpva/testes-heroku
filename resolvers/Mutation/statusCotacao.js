const db = require('../../config/db');

module.exports = {
  async novoStatusCotacao(_, { dados }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const existe = await db('status_cotacao')
        .where({ nome: dados.nome, status: '1' })
        .first();
      if (existe) throw new Error('Status já cadastrado, tente novamente');
      const [id] = await db('status_cotacao').insert({ ...dados });
      return await db('status_cotacao')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarStatusCotacao(_, { id, dados }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const status = await db('status_cotacao')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!status) throw new Error('Status não cadastrado');
      const verifica = await db('status_cotacao')
        .select()
        .where({ nome: dados.nome, status: '1' })
        .andWhere(function() {
          this.whereNot({ id });
        })
        .first();
      if (verifica) throw new Error('Status já cadastrado, tente novamente');
      await db('status_cotacao')
        .where({ id })
        .update({ ...dados });
      return db('status_cotacao')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirStatusCotacao(_, { id }) {
    throw new Error('Acesso Negado!');
    /*
    try {
      const status = await db('status_cotacao')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!status) throw new Error('Status não cadastrado');
      await db('status_cotacao')
        .where({ id })
        .update({ status: '2' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    } */
  },
};
