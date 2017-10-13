var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Person = require('../app/models/institutions'),
Model = mongoose.model('Institution'),
logger = require('../config/logger');

logger.log("Loading Mongoose functionality");
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1/uccss', {useMongoClient: true});
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + 'mongodb://127.0.0.1/uccss');
});
mongoose.connection.once('open', function callback() {
  logger.log("Mongoose connected to the database");
});

Model.find()
	.then(institutions => {
		var updates = institutions.map(detail => {  
			if(detail.institutionStatus !== '02'){
				detail.dropDate = null;
				detailId = detail._id; 
				console.log(detail);
				detail = detail.toObject();				
				return { 
					updateOne: { 
						"filter": { "_id": detail._id },              
						"update": detail 
					} 
				}   
			}
		  });     
		  updates = updates.filter(item => {
			  return item !== undefined;
		  }) 

		Model.bulkWrite(updates, function(err, result) {
			if(err){
				console.log(err)
			  }  
		})
	})
	.catch(err => {
		console.log(err);
	});