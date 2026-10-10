const fs = require('fs');

const proxy = [
  {
    context: ['/smart-api'],
    target: 'https://apidesenv.go.gov.br/smart/clientes/v1.0',
    pathRewrite: {'^/smart-api' : ''},
    secure: false,
    logLevel: 'debug',
    changeOrigin: true
  },
  {
    context: ['/acesso-usuario-api'],
    target: 'https://apidesenv.go.gov.br/portal/acessos-usuarios/v1.0',
    pathRewrite: {'^/acesso-usuario-api' : ''},
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    rejectUnhauthorized : false
  }
];
module.exports = proxy;

