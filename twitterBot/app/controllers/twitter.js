var express = require('express'),
//   debug = require('debug')('uccss'),
  router = express.Router();
//   mongoose = require('mongoose'),
//   System = mongoose.model('System'),
//   passport = require('passport'),
//   Model = mongoose.model('Client')

var twitter = require('twitter');



requireAuth = function(next){
	return next();
}

module.exports = function (app, config) {
  app.use('/', router);

router.post('/api/twitter', function(req, res, next){
     console.log('Start twitter stream');
	 if(req.body.keyword){

		 if(req.body.on){
			 	var Twitter = new twitter(config.secret);
				var stream = Twitter.stream('statuses/filter', {track: req.body.keyword});
					stream.on('data', function(event) {
					console.log(event && event.text);
				});
				
				stream.on('error', function(error) {
					throw error;
				});

				res.status(200).json({message: "Twtter stream for " + req.body.keyword + " started"})
		 } else {
			 	Twitter.destroy();
				 res.status(200).json({message: "Twtter stream stopped"})
		 }

	 }

	// 	 Twitter.stream('statuses/filter', {track: req.query.keword}, function(stream) {
	// 		stream.on('data', function(tweet) {
	// 			console.log(tweet);
	// 		});

	// 		stream.on('error', function(error) {
	// 			console.log(error);
	// 		});
	// 	});
	// 	res.status(200).json({message: "Twtter stream for " + req.query.keyword + " started"})
	//  }
  });



}