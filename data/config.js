var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	mongoose = require('mongoose'),
	schema = require('./models/config'),
	fs = require('fs')
	Model = mongoose.model('Config');


	var db = 'mongodb://127.0.0.1/uccss-test';

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
			data = data.split('\n');				
			let dataArray = new Array();
			console.log('LDKJFLDJ')
			console.log(process.argv[3])
			data.forEach((item, index) => {
				if(index > 0){
					var obj = new Object();
					let array = item.split(process.argv[3]);
					if(array[1] != undefined){

						obj._id = array[0]
						obj.parameter = array[1]
						obj.value = array[2]
						obj.type = array[3]
						obj.readOnly = false
						array.description = array[7]
						
						console.log(obj.parameter)
						var newDoc = new Model(obj);
						newDoc.save(function(err,object){
							if(err) {
								console.log(obj)
								console.log(err)
							}
						});
					}
				}
			})
			
		} else {
			console.log(err)
		}
	})