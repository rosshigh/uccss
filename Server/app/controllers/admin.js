'use strict'

var express = require('express'),
 	mongoose = require('mongoose'),
  	router = express.Router(),
  	passport = require('passport'),
  	path = require('path'),
	// rootPath = path.normalize(__dirname + '/..'),
  	logger = require('../../config/logger'),
	dir = require('node-dir'),
	HelpTickets = mongoose.model('HelpTicket'),
	ClientRequests = mongoose.model('ClientRequest');

  var requireAuth = passport.authenticate('jwt', { session: false });  
  const authFolder = './log-auth/';
  const logFolder = './log/';
  const pm2LogFolder = './pm2Log/';

module.exports = function (app, config) { 
  app.use('/api', router); 


  	router.route('/adminLog').get(function(req, res, next){
		logger.log('info','Get auth log files', 'verbose');
		const fs = require('fs');
		fs.readdir(authFolder, (err, files) => {
			if(err) {
				 return next(err);
			} else {
				if(files) res.status(200).json(files);
			}
		})
	});

	router.route('/adminLog/:fileName').get(function(req, res, next){
		logger.log('info','Get auth log file' + req.params.fileName, 'verbose');
		let filePath = authFolder + req.params.fileName;
		fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
			if (!err){
				data = data.split('\n');				
				let dataArray = new Array();
				data.forEach(item => {
					var obj = new Object();
					let array = item.replace('{','').replace('}','').split(',');				
					array.forEach(item2 => {
						let propArray = item2.split('"').join('').replace('\r','').split(":");
						if(propArray[0] === 'timestamp'){
							obj[propArray[0]] = propArray[1] + ':' + propArray[2] + ':' + propArray[3];
						} else {
							obj[propArray[0]] = propArray[1];
						}
					})
					dataArray.push(obj);
				});
				res.status(200).json(dataArray)
			} else{
				return next(err);
			}

		});
	});

	router.route('/adminLog/').put(function(req, res, next){
		logger.log('info','Deleting ' + req.body.files.length + ' auth log files', 'verbose');
		if(req.body.files){
			try {
				req.body.files.forEach(file => {
					let fileName = authFolder + file + '.log';					
					fs.unlink(fileName);
				});
				res.status(200).json({message: "Files deleted"});
			}
			catch(err){
				 return next(err);
			}
		}
	});

	router.route('/log').get(function(req, res, next){
		logger.log('info','Get log files', 'verbose');
		const fs = require('fs');
		fs.readdir(logFolder, (err, files) => {
			if(err) {
				 return next(err);
			} else {
				if(files) res.status(200).json(files);
			}
		})
	});

	router.route('/log/:fileName').get(function(req, res, next){
		logger.log('info','Get log file' + req.params.fileName, 'verbose');
		let filePath = logFolder + req.params.fileName;
		fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
			if (!err){
				
				data = data.split('\n');
				let dataArray = new Array();
				data.forEach(item => {
					var obj = new Object();
					let array = item.replace('{','').replace('}','').split(',');
					array.forEach(item2 => {
						let propArray = item2.split('"').join('').replace('\r','').split(":");
						if(propArray[0] === 'timestamp'){
							obj[propArray[0]] = propArray[1] + ':' + propArray[2] + ':' + propArray[3];
						} else {
							obj[propArray[0]] = propArray[1];
						}
					})
					dataArray.push(obj);
				});
				res.status(200).json(dataArray)
			} else{
				return next(err);
			}

		});
	});

	router.route('/log/').put(function(req, res, next){
		logger.log('info','Deleting ' + req.body.files.length + ' log files', 'verbose');
		if(req.body.files){
			try {
				req.body.files.forEach(file => {
					let fileName = logFolder + file + '.log';				
					fs.unlink(fileName);					
				});
				res.status(200).json({message: "Files deleted"});
			}
			catch(err){
				 return next(err);
			}
		}
	});

	router.route('/files/').get(function(req, res, next){
		let filesFilder = config.uploads;

		dir.files(filesFilder, function(err, files) {
			if (err)  return next(err);
				if(files) res.status(200).json(files);
			});
	});

	router.route('/files/:file').delete(function(req, res, next){
		logger.log('info',"Delete file " + req.params.file);
		if(req.params.file){
			req.params.file = req.params.file.split("$@").join('/');
			fs.stat(req.params.file, function (err, stats) {
				if(err) return next(err);			
				if(stats){
					if (stats.isFile()) {            
						fs.unlink(req.params.file);
					}
					res.status(200).json({"message": "File deleted"});
				} else {
					res.status(404).json({"message": "File not found"});
				}
			})
		} else {
			res.status(404).json({"message": "File not found"});
		}

	})

	router.route('/pm2Log/fileList/:type').get(function(req, res, next){
		logger.log('info','Get forever log files', 'verbose');
		const fs = require('fs');
		fs.readdir(pm2LogFolder, (err, files) => {
			if(err) {
				 return next(err);
			} else {
				files = files.filter(item => {
					return item.substring(0,3) === req.params.type;
				})
				if(files) res.status(200).json(files);
			}
		})
	});

	router.route('/pm2Log/:fileName').get(function(req, res, next){
		logger.log('info','Get forever log file' + req.params.fileName, 'verbose');
		let filePath = pm2LogFolder + req.params.fileName;
		fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
			if (!err){
				res.status(200).json(data)
			} else{
				return next(err);
			}

		});
	});

	router.route('/pm2Log/').put(function(req, res, next){
		logger.log('info','Deleting ' + req.body.files.length + ' forever log files', 'verbose');
		if(req.body.files){
			try {
				req.body.files.forEach(file => {
					let fileName = pm2LogFolder + file + '.log';					
					fs.unlink(fileName);
				});
				res.status(200).json({message: "Files deleted"});
			}
			catch(err){
				 return next(err);
			}
		}
	});

	router.route('/pm2Log/rename/:file/:newName').put(function(req, res, next){
		logger.log('info','Renaming forever log file', 'verbose');
		try {
			let fileName = pm2LogFolder + req.params.file + '.log';
			let newFileName = pm2LogFolder + req.params.newName + '.log';
		
			fs.rename(fileName, newFileName, function(err) {
				if ( err ) console.log('ERROR: ' + err);
			});
			res.status(200).json({message: "File renamed"});
		}
		catch(err){
				return next(err);
		}
	});

	router.route('/database/stats/:collection').get(function(req, res, next){
		logger.log('info','Get stats for collection ' + req.params.collection);
		switch(req.params.collection){
			case 'helptickets':
				var collection = HelpTickets;
		}
		HelpTickets.stats(function(err, stats) {
			if(err) return next(err);

          res.status(200).json(stats);
        });
	});

	router.route('/test/crash').get(function(req, res, next){
		process.exit(-1) 
	})

	router.route('/test/email').get(function(req, res, next){
		  var context = {}            
          var mailObj = {
            email: 'hightowe@uwm.edu',
            cc: 'rhightower@gmail.com',
            context: context
          }         
		  
          test(mailObj); 
	})

	
	router.route('/deleteAudit').put(function(req, res, next){
		var bulk = ClientRequests.collection.initializeUnorderedBulkOp();
		bulk.find({audit: {$not: {$eq: null} } }).update({$set: {audit: []}});  //{$set: {status: 'inactive'}}

		bulk.execute(function(err) {
			if(err) return next(err);
			res.status(200).json({message: 'It worked!'});
		});
	})
}