var mongoose = require('mongoose'),
	Person = require('./models/people'),
	Institution = require('./models/institutions'),
	InstitutionModel = mongoose.model('Institution'),
	Iconv  = require('iconv-lite'),
	fs = require('fs'),
	Model = mongoose.model('Person');


var db = 'mongodb://127.0.0.1/uccss-test';

	// console.log('Parse file ' + process.argv[2]);
	// mongoose.set('debug', true);
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

	let filePath = './data/chico/People-semi.csv';
	var buffer = fs.readFile(filePath, function(err, data){
		if (!err){
			result = Iconv.decode(data, "win1252");
			data = result.split('\n');						
			data.forEach((item,index) => {
				if(index > 0){	
					var obj = new Object();
					let array = item.split(';');									
					obj.firstName = array[4];
					obj.middleName = array[5];
					obj.lastName = array[3];
					obj.title = array[7];
					obj.departmentName = array[37];
					obj.email = array[14];
					obj.password = array[26];
					obj.phone = array[12];
					obj.mobile = array[13];
					obj.fax = array[15];
					obj.address1 = array[16]
					obj.address2 = array[35];
					obj.city = array[17];
					obj.region = array[18];
					obj.postalCode = array[19];
					obj.country = array[20];
					obj.POBox = array[35];
					obj.institutionId = array[1];
					obj.roles = new Array();
					obj.roles.push('USER');					
					if(array[28] && array[28].indexOf('BSTAFF') > -1) obj.roles.push('UCCA');
					if(array[28] && array[28].indexOf('TSTAFF') > -1) obj.roles.push('UCCT');
					if(array[28] && array[28].indexOf('ASTAFF') > -1) obj.roles.push('UCCA');
					if(array[28] && array[28].indexOf('COORD') > -1) obj.roles.push('PRIM');
					if(array[22] == 1) obj.roles.push('BUSI');
					if(array[23] == 1) obj.roles.push('TECH');
					obj.active = array[32] == 1; 
					obj.personStatus = pad(array[33]);
					obj.personSpecialization = pad(array[11]);
					obj.academicTitle = pad(array[8]);
					obj.departmentCategory =pad( array[10]);
					obj.noteCategories = ['HelpTickets'];
					obj.courses = new Array();
					obj.audit = [
							{
								property: 'Created',
								eventDate: new Date()
							}
						]
					
					if(obj.firstName){
						InstitutionModel.find({key: array[1]})
						.then(result => {						
								if(!result[0])	{
									// console.log('NO INSTITUION ' + array[1])
								} else {									
									obj.institutionId = result[0]._id;
									var newPerson = new Model(obj);									
									// console.log("SAVING")
									if (index == 100) console.log(newPerson)								
									newPerson.save(function(err, object){
										
										 if(err){
											console.log("ERROR")
											console.log(obj)
											console.log(err)
										 } else {
											 if(object){
												console.log(object.fullName + ' created')
											 }
										 }
								})				
							}
						})
						.catch(error => {
							console.log(error)
						})
						
					}
				}
				
			});
		}
	});

	function pad(value){
		return value ? value.length === 2 ? value : '0' + value : "";
	}
		
	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				return;
			}
		}
	}