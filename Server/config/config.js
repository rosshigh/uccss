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
    corsDomain: 'http://localhost:5000',
    secret: "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
    uploads: './public/uploadedFiles',
    smtp: 'smtps://rhightower@gmail.com:Kinja1@3@smtp.gmail.com',
    emailAddress: 'ucc@uwm.edu',
    sg_key: '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'
  },

  test: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 5000,
    db: 'mongodb://localhost/uccss-dev',
    corsDomain: 'http://192.168.116.1:9000',
    emailAddress: 'rhightower@gmail.com'

  },

  production: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 80,
    db: 'mongodb://localhost/uccss',
    corsDomain: 'http://129.89.93.81',
    secret: "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
    uploads: './public/uploadedFiles',
    smtp: 'smtprelay.uwm.edu',
    emailAddress: 'ucc@uwm.edu'
  }
};

module.exports = config[env];
