const db = require('../../config/db');
// const { usuario: obterUsuario } = require('../Query/usuario');
// const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoCliente(_, { dados }, ctx) {
    ctx && ctx.validarVendedor();
    try {
      const existe = await db('clientes')
        .where({
          cpf_cnpj: dados.cpf_cnpj,
          status: '1',
          vendedor_id: ctx.usuario.pessoa_id,
        })
        .first();
      if (existe) throw new Error('CPF/CNPJ já cadastrado, tente novamente');
      dados.vendedor_id = ctx.usuario.pessoa_id;
      const [id] = await db('clientes').insert({ ...dados });
      return await db('clientes')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarCliente(_, { id, dados }, ctx) {
    ctx && ctx.validarVendedor();
    try {
      const cliente = await db('clientes')
        .select()
        .where({ id, status: '1' })
        .first();

      if (!cliente) throw new Error('Cliente não cadastrado');
      const verifica = await db('clientes')
        .select()
        .where({
          cpf_cnpj: dados.cpf_cnpj,
          status: '1',
          vendedor_id: ctx.usuario.pessoa_id,
        })
        .andWhere(function() {
          this.whereNot({ id });
        })
        .first();
      if (verifica) throw new Error('CPF/CNPJ já cadastrado, tente novamente');
      await db('clientes')
        .where({ id })
        .update({ ...dados });
      return db('clientes')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirCliente(_, { id }, ctx) {
    ctx && ctx.validarVendedor();
    try {
      const cliente = await db('clientes')
        .select()
        .where({ id, status: '1', vendedor_id: ctx.usuario.pessoa_id })
        .first();
      if (!cliente) throw new Error('Cliente não cadastrado');
      await db('clientes')
        .where({ id })
        .update({ status: '2' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
