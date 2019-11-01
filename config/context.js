const jwt = require('jwt-simple');

module.exports = async ({ req }) => {
  //Em desenvolvimento
  // await require('./simularUsuarioLogado')(req);
  const auth = req.headers.authorization;
  // console.log(auth);
  const token = auth && auth.substring(7);
  // console.log(token);

  let usuario = null;
  let admin = false;
  let vendedor = false;
  let funcionario = false;

  if (token) {
    try {
      let conteudoToken = jwt.decode(token, process.env.APP_AUTH_SECRET);
      if (new Date(conteudoToken.exp * 1000) > new Date()) {
        usuario = conteudoToken;
      }
    } catch (e) {
      // throw new Error(e.message);
    }
  }
  if (usuario && usuario.tipo_pessoa_id) {
    admin = usuario.tipo_pessoa_id === 5;
    vendedor = usuario.tipo_pessoa_id === 2;
    funcionario = usuario.tipo_pessoa_id === 3;
  }

  // console.log(usuario);
  const err = new Error('Acesso negado!');

  return {
    usuario,
    admin,
    vendedor,
    validarUsuario() {
      if (!usuario) throw err;
    },
    validarAdmin() {
      if (!admin) throw err;
    },
    validarVendedor() {
      if (!vendedor) throw err;
    },
    validarFuncionario() {
      if (!funcionario) throw err;
    },
    validarLogado() {
      if (!admin && !vendedor && !funcionario) throw err;
    },
    validarEmpresa() {
      if (!admin && !funcionario) throw err;
    },
  };
};
