var mongoose = require('mongoose'),
	Person = require('./models/people'),
	Model = mongoose.model('Person'),
	Bcrypt = require('bcryptjs');

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

	go();

	function go(){
			var query =  Model.find();
			query.exec( function(err, object){
			console.log(object.length)
					if (err) {
						res.status(500).json(err);
					} else {					
						for(let i = 4001; i < 4354; i++) { //} object.forEach(item => {
							var item = object[i];
							console.log(i)						
							updatePassword(item)
					//   var obj = {_id: password._id, password: item.password};
						
						}
					}
      });
	}



		function updatePassword(item){
						Bcrypt.genSalt(10, function (err, salt) {				
							if (err) {
								console.log(err)
							} else {							
								Bcrypt.hash(item.password, salt, function (err, hash) {
console.log('HASH ' + hash)									
										if (err) {
												console.log(err)
										} else {
											item.password = hash;
											Model.findOneAndUpdate({_id: item._id},item, { multi:false}, function(err, person){
												if(err){
													console.log(err)
												} else {
													console.log(item.fullName + ' updated with password ' +  item.password)
												}
											})
										}
								});
							}
						})
		}

		function sleep(milliseconds) {
			var start = new Date().getTime();
			for (var i = 0; i < 1e7; i++) {
				if ((new Date().getTime() - start) > milliseconds){
					return;
				}
			}
		}