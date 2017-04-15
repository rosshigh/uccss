var	mongoose = require('mongoose'),
	schema = require('./models/is4ua'),
	fs = require('fs'),json
	Model = mongoose.model('is4ua');


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
			jsonData = JSON.parse(data)
			var newDoc = new Model(jsonData);			
			newDoc.save(function(err, object){
				if(err) {
					console.log(object)
					console.log(err)
				}
			});
		} else {
			console.log(err)
		}
	})
