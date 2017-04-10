var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	mongoose = require('mongoose'),
	Institution = require('models/institution'),
	Model = mongoose.model('Institution');


	console.log('Parse file' + process.argv[2]);
	let filePath = process.argv[2];
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
		if (!err){
			data = data.split('\n');				
			let dataArray = new Array();
			data.forEach((item,index) => {
				var obj = new Object();
				let array = item.split(',');	
				obj.name = array[2];
				obj.abrCode = array[1];
				obj.memberType = array[19];
				obj.institutionType = array[4];
				obj.institutionStatus = array[16] == -1;
				obj.highestDegree = array[20];
				obj.universityDept = array[7];

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
						obj.dropDate = new Date('01/01' + array[6]);
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

				var newInstitution = new Model(obj);
    			newInstitution.save(function(err,object){
					if(err) console.log("Error on " +  obj.name);
					console.log(err)
				});
			});
		}
	});
		