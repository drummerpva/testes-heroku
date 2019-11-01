const db = require('../../config/db');
// const { usuario: obterUsuario } = require('../Query/usuario');
// const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoFornecedor(_, { dados }, ctx) {
    ctx && ctx.validarFuncionario();
    try {
      const existe = await db('fornecedores')
        .where({ cpf_cnpj: dados.cpf_cnpj, status: '1' })
        .first();
      if (existe) throw new Error('CPF/CNPJ já cadastrado, tente novamente');
      const [id] = await db('fornecedores').insert({ ...dados });
      return await db('fornecedores')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarFornecedor(_, { id, dados }, ctx) {
    ctx && ctx.validarFuncionario();
    try {
      const fornecedor = await db('fornecedores')
        .select()
        .where({ id, status: '1' })
        .first();

      if (!fornecedor) throw new Error('Fornecedor não cadastrado');
      const verifica = await db('fornecedores')
        .select()
        .where({ cpf_cnpj: dados.cpf_cnpj, status: '1' })
        .andWhere(function() {
          this.whereNot({ id });
        })
        .first();
      if (verifica) throw new Error('CPF/CNPJ já cadastrado, tente novamente');
      await db('fornecedores')
        .where({ id })
        .update({ ...dados });
      return db('fornecedores')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirFornecedor(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const cliente = await db('fornecedores')
        .select()
        .where({ id, status: '1' })
        .first();
      if (!cliente) throw new Error('Fornecedor não cadastrado');
      await db('fornecedores')
        .where({ id })
        .update({ status: '2' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
