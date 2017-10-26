var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Person = require('../app/models/people'),
Model = mongoose.model('Person'),
fs = require('fs'),
logger = require('../config/logger');

logger.log("Loading Mongoose functionality");
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1/uccss-test', {useMongoClient: true});
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + 'mongodb://127.0.0.1/uccss-test');
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
	
			if(person && person.personStatus == '01'){	
				if(item[24] == -1){
					console.log(person.fullName + " " + item[20] + " " + "faculty")
					if(person.roles.indexOf('FACU') == -1){
						person.roles.push('FACU')
					}
				}
				if(item[20] == -1){
					console.log(person.fullName + " " + item[20] + " " + "legal")
					if(person.roles.indexOf('LEGL') == -1){
						person.roles.push('LEGL')
					}
					
				}				
				if(item[21] == -1){
					console.log(person.fullName + " " + item[21] + " " + "invoice")
					if(person.roles.indexOf('BUSI') == -1){
						person.roles.push('BUSI')
					}

				}
				if(item[22] == -1){
					console.log(person.fullName + " " + item[22] + " " + "technical")
					if(person.roles.indexOf('TECH') == -1){
						person.roles.push('TECH')
					}

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
	.catch(err => {
		console.log(err)
	})

	
})

