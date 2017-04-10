var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
  	logger = require('../config/logger'),
	dir = require('node-dir');



	logger.log('Parse file' + process.argv[2], 'verbose');
	let filePath = process.argv[2];
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
		if (!err){
			data = data.split('\n');				
			let dataArray = new Array();
			data.forEach((item,index) => {
				// console.log(item)
				var obj = new Object();
				let array = item.split(',');				
				// console.log(array)
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
				obj.personStatus = array[32];
				// departmentCategory = array[];
				obj.personSpecialization = array[10];
				obj.academicTitle = array[7];
				obj.departmentCategory = array[9];

				if(index == 12 || index == 1) {
					console.log(obj)
				}
				// array.forEach(item2 => {
				// 	let propArray = item2.split('"').join('').replace('\r','').split(":");
				// 	if(propArray[0] === 'timestamp'){
				// 		obj[propArray[0]] = propArray[1] + ':' + propArray[2] + ':' + propArray[3];
				// 	} else {
				// 		obj[propArray[0]] = propArray[1];
				// 	}
				// })
				// dataArray.push(obj);
			});
		}
	});
		