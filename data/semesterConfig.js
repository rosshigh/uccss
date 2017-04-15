var	mongoose = require('mongoose'),
	schema = require('./models/config'),
	fs = require('fs'),json
	Model = mongoose.model('SemesterConfig');


	var db = 'mongodb://127.0.0.1/uccss-dev';

	console.log('Parse file ' + process.argv[2]);
	mongoose.Promise = require('bluebird');
	mongoose.connect(db);
	var db = mongoose.connection;
	db.on('error', function () {
		throw new Error('unable to connect to database at ' + db);
	});
	mongoose.connection.once('open', function callback() {
		console.log("Mongoose connected to the database");
	});
	
	let filePath = process.argv[2];
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
		if (!err){
			var array = data.split('@')		
			array.forEach(item => {
				jsonData = JSON.parse(item)
				var newDoc = new Model(jsonData);	
				console.log(newDoc)				

				newDoc.save(function(err, object){
					if(err) {
						console.log(object)
						console.log(err)
					}
				});
			})
			
		} else {
			console.log(err)
		}
	})