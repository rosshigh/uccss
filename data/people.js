var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
  	mongoose = require('mongoose'),
	Person = require('./models/people'),
	Institution = require('./models/institutions'),
	InstitutionModel = mongoose.model('Institution'),
	fs = require('fs'),
	Model = mongoose.model('Person');

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
			data.forEach((item,index) => {
				// console.log(item)
				if(index > 0){
					var obj = new Object();
					let array = item.split(process.argv[3]);				
					// console.log(array)
					obj.key = array[1];
					obj.firstName = array[3];
					obj.middleName = array[4];
					obj.lastName = array[2];
					obj.title = array[6];
					obj.departmentName = array[36];
					// obj.salutation = array[];
					obj.email = array[13];
					obj.password = array[25];
					obj.phone = array[11];
					obj.mobile = array[12];
					obj.fax = array[14];
					obj.address1 = array[15];
					obj.address2 = array[33];
					obj.city = array[16];
					obj.region = array[17];
					obj.postalCode = array[18];
					obj.country = array[19];
					// obj.timeZone = array[29];
					obj.langage = array[30];
					obj.POBox = array[34];
					obj.institutionId = array[1];
					obj.roles = new Array();
					obj.roles.push('USER');
					if(array[20] == -1) obj.roles.push('TECH');
					if(array[23] == -1) obj.roles.push('PRIM');
					if(array[21] == -1) obj.roles.push('BUSI');
					if(array[27] && array[27].indexOf('COORD') > -1) obj.roles.push('LEGL');
					obj.active = array[32] == 1; 
					obj.personStatus = pad(array[32]);
					// departmentCategory = array[];
					obj.personSpecialization = pad(array[10]);
					obj.academicTitle = array[7];
					obj.departmentCategory =pad( array[9]);
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
									console.log(obj)
								} else {
									obj.institutionId = result[0]._id;
									var newPerson = new Model(obj);									
									newPerson.save()
									.then(object =>{
										console.log(object.fullName + ' created')
									})
									.catch(error => {
										console.log(obj)
										console.log(error)
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
		