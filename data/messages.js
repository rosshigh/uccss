var mongoose = require('mongoose'),
	schema = require('./models/site'),
	fs = require('fs')
	Model = mongoose.model('Message');


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
					if(array[3] != undefined){

						obj._id = array[0]
						obj.description = array[1]
						obj.content = array[2]
						obj.category = array[3]
						obj.key = false
						
						console.log(obj.category)
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