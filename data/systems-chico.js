var mongoose = require('mongoose'),
	product = require('./models/products'),
	Product = mongoose.model('Product'),
	clientRequests = require('./models/clientRequest'),
	ClientRequestDetail = mongoose.model('ClientRequestDetail'),
	ClientRequest = mongoose.model('ClientRequest'),
	ClientModule = require('./models/clients'),
	Client = mongoose.model('Client'),
	System = require('./models/systems'),
	fs = require('fs'),
	Model = mongoose.model('System');

var db = 'mongodb://127.0.0.1/uccss-test';

	mongoose.Promise = require('bluebird');
	mongoose.connect(db);
	var db = mongoose.connection;
	db.on('error', function () {
		throw new Error('unable to connect to database at ' + db);
	});
	mongoose.connection.once('open', function callback(err, db) {
		if(err) console.log(err)
		console.log("Mongoose connected to the database");
	});

	let filePath = './data/chico/Systems-semi.csv';
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
		if (!err){
			data = data.split('\r\n');						
			let dataArray = new Array();
			data.forEach((item,index) => {
				if(index > 0){
					var obj = new Object();
					let array = item.split(';');	
					obj.description = array[2];
					obj.sid = array[3];
					obj.server = array[2];
					obj.instance = '00';		

					if(obj.server){

						var newSystem = new Model(obj);									
						newSystem.save(function(err, object){
							if(err){
								console.log("ERROR")
								console.log(obj)
								console.log(err)
							} else {
								if(object){
									console.log(object.server + ' created')
								}
							}
						})				
							
						
					}
				}
				
			});
		}
	});
