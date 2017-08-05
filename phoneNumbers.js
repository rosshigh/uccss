var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
  	mongoose = require('mongoose'),
	Person = require('./models/people'),
	Institution = require('./models/institutions'),
	InstitutionModel = mongoose.model('Institution'),
	fs = require('fs'),
	Model = mongoose.model('Person');

var db = 'mongodb://127.0.0.1/uccss-dev';

	mongoose.Promise = require('bluebird');
	mongoose.connect(db);
	var db = mongoose.connection;
	db.on('error', function () {
		throw new Error('unable to connect to database at ' + db);
	});
	mongoose.connection.once('open', function callback() {
		console.log("Mongoose connected to the database");
	});

	Person.find(function(err, people){
		people.forEach(item => {
			
			item.phone = item.phone.split("-").join('');
			item.mobile = item.mobile.split("-").join('');
			item.phone = item.phone.split(".").join('');
			item.mobile = item.mobile.split(".").join('');
			item.phone = item.phone.split("(").join('');
			item.mobile = item.mobile.split("(").join('');
			item.phone = item.phone.split(")").join('');
			item.mobile = item.mobile.split(")").join('');
			item.phone = item.phone.split(",").join('');
			item.mobile = item.mobile.split(",").join('');
			if(item.phone.toUpperCase().indexOf("EX") > -1) {
				item.ext = item.phone.substring(item.phone.toUpperCase().indexOf("EX"));
				item.phone = item.phone.substring(0, item.phone.toUpperCase().indexOf("EX") - 1);
			}
			if(item.phone.toUpperCase().indexOf("X") > -1) {
				item.ext = item.phone.substring(item.phone.toUpperCase().indexOf("X"));
				item.phone = item.phone.substring(0, item.phone.toUpperCase().indexOf("X") - 1);
			}
			console.log(item.fullName + " " + item.phone + " " + item.mobile + " " + item.ext)

			Person.findOneAndUpdate({_id: item._id}, item, {safe:true, multi:false}, function(err, person){
		      if (err) {
		        return next(err);
		      } else {    
		        console.log(person.fullName + " was updated")
		      }
		    })

	})