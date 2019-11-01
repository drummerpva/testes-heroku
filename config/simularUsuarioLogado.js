const db = require('./db');
const { getUsuarioLogado } = require('../resolvers/Comum/Usuario');

const sql = `
  select
    u.*
  from
   usuarios u,
   tipos_pessoas tp
  where
    u.tipo_pessoa_id = tp.id AND
    tp.nome = :tipoPessoa
  limit 1
`;

const getUsuario = async tipoPessoa => {
  const res = await db.raw(sql, { tipoPessoa });
  return res ? res[0][0] : null;
};

module.exports = async req => {
  const usuario = await getUsuario('VENDEDOR');
  if (usuario) {
    const { token } = await getUsuarioLogado(usuario);
    req.headers = {
      authorization: `Bearer ${token}`,
    };
  }
};
