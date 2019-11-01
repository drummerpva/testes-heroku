const cliente = require('./cliente');
const vendedor = require('./vendedor');
const funcionario = require('./funcionario');
const setor = require('./setor');
const fornecedor = require('./fornecedor');
const produto = require('./produto');
const cor = require('./cor');
const usuario = require('./usuario');
const statusCotacao = require('./statusCotacao');
const cotacaoC = require('./cotacaoC');

module.exports = {
  ...cliente,
  ...vendedor,
  ...funcionario,
  ...setor,
  ...fornecedor,
  ...produto,
  ...cor,
  ...usuario,
  ...statusCotacao,
  ...cotacaoC,
};
