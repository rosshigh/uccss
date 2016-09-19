var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 5000,
    https_port: 5001,
    db: 'mongodb://127.0.0.1/uccss-dev',
    corsDomain: 'http://localhost:9000',
    secret: "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
    uploads: './public/uploadedFiles',
    smtp: 'smtps://rhightower@gmail.com:Kinja1@3@smtp.gmail.com',
    emailAddress: 'rhightower@gmail.com'
  },

  test: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 5000,
    db: 'mongodb://localhost/uccss-dev',
    corsDomain: 'http://localhost:9000',
    emailAddress: 'rhightower@gmail.com'

  },

  production: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 80,
    db: 'mongodb://localhost/uccss',
    corsDomain: 'http://localhost:9000',
    secret: "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
    uploads: './public/uploadedFiles',
    smtp: 'smtprelay.uwm.edu',
    emailAddress: 'ucc@uwm.edu'
  }
};

module.exports = config[env];
