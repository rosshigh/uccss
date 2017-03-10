var express = require('express'),
  	router = express.Router(),
  	passport = require('passport'),
  	path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
  	logger = require('../../config/logger'),
	dir = require('node-dir');

  var requireAuth = passport.authenticate('jwt', { session: false });  
  const authFolder = './log-auth/';
  const logFolder = './log/';

module.exports = function (app, config) {
  app.use('/api', router);


  	router.route('/adminLog').get(function(req, res, next){
		logger.log('Get auth log files', 'verbose');
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
		logger.log('Get auth log file' + req.params.fileName, 'verbose');
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
	
				console.log('received data: ' + dataArray[0]);
				// data = JSON.parse(data)
				res.status(200).json(dataArray)
				// res.writeHead(200, {'Content-Type': 'text/html'});
				// res.write(data);
				// res.end();
			} else{
				return next(err);
			}

		});
	});

	router.route('/adminLog/').put(function(req, res, next){
		logger.log('Deleting ' + req.body.files.length + ' auth log files', 'verbose');
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
		logger.log('Get log files', 'verbose');
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
		logger.log('Get log file' + req.params.fileName, 'verbose');
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
		logger.log('Deleting ' + req.body.files.length + ' log files', 'verbose');
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
		console.log(filesFilder)
		dir.files(filesFilder, function(err, files) {
			if (err)  return next(err);
				if(files) res.status(200).json(files);
			});
	});

	router.route('/files/:file').delete(function(req, res, next){
		logger.log("Delete file " + req.params.file);
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
}