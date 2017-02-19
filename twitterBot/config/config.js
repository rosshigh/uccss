var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'UCCSS'
    },
    port: 9999,
    https_port: 5001,
    db: 'mongodb://127.0.0.1/uccss-dev',
	secret : {
		consumer_key: 'iTgYvu8Ttk1oJ7dYz26EgVC49',
		consumer_secret: '5vAEQbemh6lkVBp33Wqk36Y8NxKaax5iSlFydj8S0TohbkOs1G',
		access_token_key: '2370499542-MP5KA9MZKyz7DbhRBmvW3jB2FWfLpjrAswn8s0T',
		access_token_secret: '9FwRUuezYPEwI5x2z4McILsbTUi4H6mayldFJ32J25FuI'
	}
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
