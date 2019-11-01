const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const { getUsuarioLogado } = require('../Comum/Usuario');

module.exports = {
  async login(_, { dados }) {
    const usuario = await db('usuarios')
      .where({ email: dados.email })
      .first();
    if (!usuario) throw new Error('Usuário/Senha inválido');
    const saoIguais = bcrypt.compareSync(dados.senha, usuario.senha);
    if (!saoIguais) throw new Error('Usuário/Senha inválido');

    return getUsuarioLogado(usuario);
  },
  usuarios(_, { filtro }, ctx) {
    ctx && ctx.validarLogado();
    if (!filtro) return db('usuarios').select();
    return filtro.email
      ? db('usuarios')
          .select()
          .where('email', 'like', `%${filtro.email}%`)
          .andWhere({ status: 'C' })
      : db('usuarios')
          .select()
          .where({ status: 'C' });
  },
  usuario(_, { id }, ctx) {
    if (ctx.admin) {
      return id
        ? db('usuarios')
            .select()
            .where({ id: id, status: 'C' })
            .first()
        : null;
    }
    if (ctx.funcionario || ctx.vendedor) {
      if (id !== ctx.usuario.id) throw new Error('Acesso Negado!');
      return id
        ? db('usuarios')
            .select()
            .where({ id: id, status: 'C', pessoa_id: ctx.usuario.pessoa_id })
            .first()
        : null;
    }
  },
};
