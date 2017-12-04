var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 80,
    https_port: 443,
    db: 'mongodb://127.0.0.1/uccss-dev',
    corsDomain: 'http://localhost:5000',
    secret: "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
    uploads: './public/uploadedFiles',
    UCC_HOME: "Milwaukee",
    UCC_ID: "58e6c8f23b75444aa021be7e",
    smtp: 'smtps://rhightower@gmail.com:Kinja1@3@smtp.gmail.com',
    emailAddress: 'ucc@uwm.edu',
    sg_key: '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',
    weatherAPI: '0f85bb931f8faad7e35b6f685aa4e931'
  },

  test: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 5000,
    db: 'mongodb://localhost/uccss-dev',
    corsDomain: 'http://192.168.116.1:9000',
    emailAddress: 'rhightower@gmail.com',
    weatherAPI: '0f85bb931f8faad7e35b6f685aa4e931'

  },

  production: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 80,
    https_port: 443,
    db: 'mongodb://localhost/uccss',
    corsDomain: 'http://ucc.uwm.edu',
    secret: "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
    uploads: './public/uploadedFiles',
    UCC_HOME: "Milwaukee",
    UCC_ID: "58e6c8f23b75444aa021be7e",
    smtp: 'smtprelay.uwm.edu',
    emailAddress: 'ucc@uwm.edu',
    weatherAPI: '0f85bb931f8faad7e35b6f685aa4e931'
  }
};

module.exports = config[env];
