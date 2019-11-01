const jwt = require('jwt-simple');

module.exports = {
  async getUsuarioLogado(usuario) {
    const agora = Math.floor(Date.now() / 1000);

    const usuarioInfo = {
      id: usuario.id,
      email: usuario.email,
      tipo_pessoa_id: usuario.tipo_pessoa_id,
      pessoa_id: usuario.pessoa_id,
      iat: agora,
      exp: agora + 24 * 60 * 60,
    };

    const authSecret = process.env.APP_AUTH_SECRET;
    return {
      ...usuarioInfo,
      token: jwt.encode(usuarioInfo, authSecret),
    };
  },
};
