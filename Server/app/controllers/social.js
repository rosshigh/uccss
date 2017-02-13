var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	multer = require('multer'),
	mkdirp = require('mkdirp'),
  	Blog = mongoose.model('Blog'),
	Forum = mongoose.model('Forum'),
	logger = require('../../config/logger');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

	router.get('/api/blogs', function(req, res, next){
		logger.log('Get Blogs', 'verbose');
		var query = buildQuery(req.query, Blog.find())
		query.exec(function(err, object){
			if (err) {
			return next(err);
			} else {
			res.status(200).json(object);
			}
		});
	});

	router.get('/api/blogs/:id', requireAuth, function(req, res, next){
		logger.log('Get blog '+ req.params.id, 'verbose');
		Blog.findById(req.params.id)
		.exec()
		.then(object => {
			res.status(200).json(object);
		})
		.catch(error => {
			return next(error);
		})
	});

	router.post('/api/blogs', requireAuth, function(req, res, next){
		logger.log('Create blog', "verbose");
		var blog =  new Blog(req.body);
		blog.save( function ( err, object ){
		if (err) {
			return next(err);
		} else {          
			res.status(200).json(object);
		}
		});
	});

	router.put('/api/blogs', requireAuth, function(req, res, next){
		logger.log('Update blog '+ req.body._id, 'verbose');

		Blog.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false})
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			return next(error);
		})
	});

	router.get('/api/forums', function(req, res, next){
		logger.log('Get Blogs', 'verbose');
		var query = buildQuery(req.query, Forum.find())
		query
			.sort('dateCreated')
      		.populate('children')
			.exec(function(err, object){
				if (err) {
					return next(err);
				} else {
					res.status(200).json(object);
				}
			});
	});

	router.get('/api/forums/:id', requireAuth, function(req, res, next){
		logger.log('Get blog '+ req.params.id, 'verbose');
		Forum.findById(req.params.id)
		.exec()
		.then(object => {
			res.status(200).json(object);
		})
		.catch(error => {
			return next(error);
		})
	});

	router.post('/api/forums', requireAuth, function(req, res, next){
		logger.log('Create blog', "verbose");
		var forum =  new Forum(req.body);
		forum.save()
			.then(item => {			
				if(item.parentId){
					Forum.findById(item.parentId)
					.then(parent => {
						if(parent){
							parent.children = parent.children ? parent.children : new Array();
							parent.children.push(item._id);
							parent.save()
							.then(parentModified => {
								res.status(200).json(item);
							})
							.catch(error => {
								return next(error);
							})
						} else {
							res.status(200).json(item);
						}
					})
				}
			}) 
			.catch(error => {
				return next(err);
			})
	});

	router.put('/api/forums', requireAuth, function(req, res, next){
		logger.log('Update forum '+ req.body._id, 'verbose');

		Forum.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false})
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			return next(error);
		})
	});

};