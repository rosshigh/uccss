var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	mongoose = require('mongoose'),
	Institution = require('./models/institutions'),
	fs = require('fs'),
	Model = mongoose.model('Institution');


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
			data = data.split('\n');				
			let dataArray = new Array();
			data.forEach((item, index) => {
				if(index > 0){

					var obj = new Object();
					let array = item.split(process.argv[3]);	
					obj.name = array[2];
					obj.abrCode = array[1];
					obj.memberType = pad(array[19]);
					obj.institutionType = pad(array[4]);
					obj.institutionStatus = pad(array[21]);// == -1 ? '01' : '02';
					obj.active = array[16] == -1;
					obj.highestDegree = pad(array[20]);
					obj.universityDept =array[7];
					obj.key = array[0];

					if(array[5]) {
						if(array[5].length == 4){
							obj.joinDate = new Date('01/01/' + array[5]);
						} else {
							var year = array[5].substr(4,2) + "/" + array[5].substr(6,2) + "/" + array[5].substr(0,4)
							obj.joinDate = new Date(year);
						}
					}
					if(array[6]) {
						if(array[6].length == 4){
							obj.dropDate = new Date('01/01/' + array[6]);
						} else {
							var year = array[6].substr(4,2) + "/" + array[6].substr(6,2) + "/" + array[6].substr(0,4)
							obj.dropDate = new Date(year);
						}
					}
					obj.address1 = array[9] + " " + array[8];
					obj.POBox = array[11];
					obj.city = array[10];
					obj.region = array[13];
					obj.country = array[15];
					obj.postalCode = array[14];
					obj.timeZone = array[18];
					obj.url = array[23];
					obj.faculty = new Array();

					if(obj.name){
						console.log(obj.name)
						var newInstitution = new Model(obj);
						newInstitution.save(function(err,object){
							if(err) {
								console.log(obj)
								console.log(err)
							}
						});
					}
				}
				
			});
		}
	});

	function pad(value){
		return value.length === 2 ? value : '0' + value;
	}
		