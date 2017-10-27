var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Person = require('../app/models/people'),
Model = mongoose.model('Person'),
fs = require('fs'),
logger = require('../config/logger');

var DB = 'mongodb://127.0.0.1/uccss-test';
var filePath = "people.csv";
var splitChar = "%";
var fistNameIndex = 3;
var lastNameIndex = 2;
var legal = 21;
var invoice = 21;
var tech = 22;
var fac = 24;

logger.log("Loading Mongoose functionality");
mongoose.Promise = require('bluebird');
mongoose.connect(DB, {useMongoClient: true});
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + DB);
});
mongoose.connection.once('open', function callback() {
  logger.log("Mongoose connected to the database");
});

fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){

	if (!err){
		data = data.split('\n');
	} else {
		console.log(err)
	}

	var updates = [];
	var count = 0;
	Model.find()	
		.then(people => {
			data.forEach(item => {		
				item = item.split(splitChar);
				if(count === 0) console.log(item);
				count++;
				for(var i = 0; i < people.length; i++){
					if(people[i].firstName.toUpperCase() == item[fistNameIndex].toUpperCase() && people[i].lastName.toUpperCase() == item[lastNameIndex].toUpperCase()){
						var person = people[i];				
						break;
					}
				}				
				if(person && person.personStatus == '01'){								
					if(item[fac] == -1){
						console.log(person.fullName + " " + item[20] + " " + "faculty")
						if(person.roles.indexOf('FACU') == -1){
							person.roles.push('FACU')
						}
					}
					if(item[legal] == -1){
						console.log(person.fullName + " " + item[20] + " " + "legal")
						if(person.roles.indexOf('LEGL') == -1){
							person.roles.push('LEGL')
						}
						
					}				
					if(item[invoice] == -1){
						console.log(person.fullName + " " + item[21] + " " + "invoice")
						if(person.roles.indexOf('BUSI') == -1){
							person.roles.push('BUSI')
						}

					}
					if(item[tech] == -1){
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
		});
})

