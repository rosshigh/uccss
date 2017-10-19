var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Person = require('../app/models/people'),
Model = mongoose.model('Person'),
fs = require('fs'),
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


let filePath = "people.csv";
fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){

	if (!err){
		data = data.split('\n');
	} else {
		console.log(err)
	}
var updates = [];

Model.find()
	.then(people => {
		data.forEach(item => {
			item = item.split("%");
			for(var i = 0; i < people.length; i++){
				if(people[i].firstName == item[3] && people[i].lastName == item[2]){
					var person = people[i];
					break;
				}
			}
			// Model.findOne({firstName: item[3], lastName: item[2]})
			// .then(person => {
			if(person && person.active){
				if(person.roles.indexOf('FACU') == -1){
					person.roles.push('FACU')
				}
				if(item[20] == -1){
					console.log(person.fullName + " " + item[20] + " " + "legal")
					if(person.roles.indexOf('LEGL') == -1){
						person.roles.push('LEGL')
					}
					// var detail = person.toObject();
					// updates.push({
					// 	updateOne: { 
					// 		"filter": { "_id": person._id },              
					// 		"update": detailInvoice 
					// 	} 
					// })
				}				
				if(item[21] == -1){
					console.log(person.fullName + " " + item[21] + " " + "invoice")
					if(person.roles.indexOf('BUSI') == -1){
						person.roles.push('BUSI')
					}
					// var detailLegal = person.toObject();
					// updates.push({
					// 	updateOne: { 
					// 		"filter": { "_id": person._id },              
					// 		"update": detailLegal 
					// 	} 
					// })
				}
				if(item[22] == -1){
					console.log(person.fullName + " " + item[22] + " " + "technical")
					if(person.roles.indexOf('TECH') == -1){
						person.roles.push('TECH')
					}
					// var detailTech = person.toObject();
					// updates.push({
					// 	updateOne: { 
					// 		"filter": { "_id": person._id },              
					// 		"update": detailTech 
					// 	} 
					// })
				}
				var detail = person.toObject();
				updates.push({
					updateOne: { 
						"filter": { "_id": person._id },              
						"update": detail 
					} 
				})
			}
		})

		Model.bulkWrite(updates, function(err, result) {
			if(err){
				console.log(err)
			}  else {
				console.log(result)
			}
		})

	})
	

	
})
