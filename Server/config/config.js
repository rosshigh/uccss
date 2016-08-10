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
    smtp: 'sandboxf11fc1f4e8af4498a8db91b3f96e742c.mailgun.org'
  },

  test: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 5000,
    db: 'mongodb://localhost/uccss-dev',
    corsDomain: 'http://localhost:9000'

  },

  production: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 80,
    db: 'mongodb://localhost/uccss-dev',
    corsDomain: 'http://localhost:9000',
    secret: "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
    uploads: './public/uploadedFiles',
    smtp: 'sandboxf11fc1f4e8af4498a8db91b3f96e742c.mailgun.org'
  }
};

module.exports = config[env];
