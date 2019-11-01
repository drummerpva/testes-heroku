const bcrypt = require('bcrypt-nodejs');
const db = require('../../config/db');

module.exports = {
  async novoUsuario(_, { dados }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const existe = await db('usuarios')
        .where({ email: dados.email, status: '1' })
        .first();
      if (existe) throw new Error('E-mail já cadastrado, tente novamente');
      const salt = bcrypt.genSaltSync();
      dados.senha = bcrypt.hashSync(dados.senha, salt);
      delete dados.senha_antiga;
      const [id] = await db('usuarios').insert({ ...dados });
      return await db('usuarios')
        .select()
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarUsuario(_, { id, dados }, ctx) {
    if (!ctx.admin || !ctx.funcionario) throw new Error('Acesso Negado!');
    try {
      const usuario = await db('usuarios')
        .select()
        .where({ id, status: 'C' })
        .first();

      if (!usuario) throw new Error('Usuário não cadastrado');
      const verifica = await db('usuarios')
        .select()
        .where({ email: dados.email, status: 'C' })
        .andWhere(function() {
          this.whereNot({ id });
        })
        .first();
      if (verifica) throw new Error('E-mail já cadastrado, tente novamente');
      if (ctx.funcionario && usuario.pessoa_id !== ctx.usuario.pessoa_id)
        throw new Error('Acesso Negado!');
      if (dados.senha_antiga.length > 7) {
        const validaAntiga = bcrypt.compareSync(
          dados.senha_antiga,
          usuario.senha
        );
        if (ctx.funcionario && !validaAntiga)
          throw new Error('Senha Antiga Incorreta!');
        const salt = bcrypt.genSaltSync();
        dados.senha = bcrypt.hashSync(dados.senha, salt);
      } else {
        delete dados.senha;
      }
      delete dados.senha_antiga;
      await db('usuarios')
        .where({ id })
        .update({ ...dados });
      return db('usuarios')
        .select()
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async excluirUsuario(_, { id }, ctx) {
    ctx && ctx.validarAdmin();
    try {
      const usuario = await db('usuarios')
        .select()
        .where({ id, status: 'C' })
        .first();
      if (!usuario) throw new Error('Usuario não cadastrado');
      await db('usuarios')
        .where({ id })
        .update({ status: 'E' });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
