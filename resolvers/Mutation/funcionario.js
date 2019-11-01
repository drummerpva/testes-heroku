const db = require('../../config/db');
// const { usuario: obterUsuario } = require('../Query/usuario');
// const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoFuncionario(_, { dados }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const existe = await db('funcionarios')
        .where({ cpf_cnpj: dados.cpf_cnpj, status: '1' })
        .first();
      if (existe) throw new Error('CPF/CNPJ já cadastrado, tente novamente');
      const [id] = await db('funcionarios').insert({ ...dados });
      return await db('funcionarios')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarFuncionario(_, { id, dados }, ctx) {
    if (!ctx.admin || !ctx.funcionario) throw new Error('Acesso negado!');
    try {
      const funcionario = await db('funcionarios')
        .select()
        .where({ id, status: '1' })
        .first();

      if (!funcionario) throw new Error('Funcionario não cadastrado');
      const verifica = await db('funcionarios')
        .select()
        .where({ cpf_cnpj: dados.cpf_cnpj, status: '1' })
        .andWhere(function() {
          this.whereNot({ id });
        })
        .first();
      if (verifica) throw new Error('CPF/CNPJ já cadastrado, tente novamente');
      if (ctx.funcionario && funcionario.id !== ctx.usuario.pessoa_id)
        throw new Error('Não autorizado!');
      await db('funcionarios')
        .where({ id })
        .update({ ...dados });
      return db('funcionarios')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirFuncionario(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const cliente = await db('funcionarios')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!cliente) throw new Error('Funcionario não cadastrado');
      await db('funcionarios')
        .where({ id })
        .update({ status: '2' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
