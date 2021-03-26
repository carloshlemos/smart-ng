const fs = require('fs');

const proxy = [
  {
    context: ['/smart-api'],
    target: 'http://localhost:8080/smart-api/api',
    pathRewrite: {'^/smart-api' : ''},
    secure: false,
    logLevel: 'debug',
    changeOrigin: true
  },
  {
    context: ['/acesso-usuario-api'],
    target: 'https://apidesenv.go.gov.br/acessousuario/1.0.0/api',
    pathRewrite: {'^/acesso-usuario-api' : ''},
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    rejectUnhauthorized : false
  }
];
module.exports = proxy;

