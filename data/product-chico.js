var mongoose = require('mongoose'),
	Product = require('./models/products'),
	fs = require('fs'),
	Model = mongoose.model('Product');


	var db = 'mongodb://127.0.0.1/uccss-test';
	mongoose.Promise = require('bluebird');
	mongoose.connect(db);
	var db = mongoose.connection;
	db.on('error', function () {
		throw new Error('unable to connect to database at ' + db);
	});
	mongoose.connection.once('open', function callback() {
		console.log("Mongoose connected to the database");
	});
	
	fs.readFile('./data/chico/client-semi.csv', {encoding: 'utf-8'}, function(err, data){
		if (!err){
			data = data.split('\n');						
			let dataArray = new Array();
			data.forEach((item, index) => {
				if(index > 0){
					var obj = new Object();
					let array = item.split(';');	
					obj.name = array[2];
					obj.clientKey = array[0];
					obj.active = array[5] == 1;
					obj.uaCurriculum = pad(array[9])
					obj.sapProduct = pad(array[7])
					obj.uaDataset = pad(array[8])
					obj.hostWhere = array[11] == 1 ? 'UCC' : '';

					if(obj.name){
						console.log(obj.name)
						var newProduct = new Model(obj);
						newProduct.save(function(err,object){
							if(err) {
								console.log(obj)
								console.log(err)
							}
						});
					}
				}
				
			});
		} else {
			console.log(err)
		}
	});

	function pad(value){
		if(value) {
			return value.length === 2 ? value : '0' + value;
		} else {
			return "";
		}
	}
		