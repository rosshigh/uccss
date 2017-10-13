var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Person = require('../app/models/people'),
	Model = mongoose.model('Person'),
	logger = require('../config/logger');

	logger.log("Loading Mongoose functionality");
	mongoose.Promise = require('bluebird');
	mongoose.connect('mongodb://127.0.0.1/uccss-dev', {useMongoClient: true});
	var db = mongoose.connection;
	db.on('error', function () {
	  throw new Error('unable to connect to database at ' + 'mongodb://127.0.0.1/uccss-dev');
	});
	mongoose.connection.once('open', function callback() {
	  logger.log("Mongoose connected to the database");
	});

	Model.find()
		.then(people => {
			people.forEach(item => {
				item.roles.push('FACU');
				console.log(item.roles);
			});
		})
		.catch(err => {
			console.log(err);
		});