var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	multer = require('multer'),
	mkdirp = require('mkdirp'),
  	Blog = mongoose.model('Blog'),
	Forum = mongoose.model('Forum'),
	ForumMessage = mongoose.model('ForumMessage'),
	logger = require('../../config/logger');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

	router.get('/api/blogs', function(req, res, next){
		logger.log('info','Get Blogs', 'verbose');
		var query = buildQuery(req.query, Blog.find())
		.populate('personId', 'firstName lastName email file')
		query.exec(function(err, object){
			if (err) {
			return next(err);
			} else {
			res.status(200).json(object);
			}
		});
	});

	router.get('/api/blogs/:id', requireAuth, function(req, res, next){
		logger.log('info','Get blog '+ req.params.id, 'verbose');
		Blog.findById(req.params.id)
		.populate('personId', 'firstName, lastName, fullName, email')
		.exec()
		.then(object => {
			res.status(200).json(object);
		})
		.catch(error => {
			return next(error);
		})
	});

	router.post('/api/blogs', requireAuth, function(req, res, next){
		logger.log('info','Create blog', "verbose");
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
		logger.log('info','Update blog '+ req.body._id, 'verbose');

		Blog.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false})
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			return next(error);
		})
	});

	router.delete('/api/blogs/:id', requireAuth, function(req, res, next){
		writeLog.log('Delete blog ' + req.params.id, 'verbose');
		Blog.remove({_id: req.params.id})
		.exec()
		.then(result => {
			res.status(204).json(result);
		})
		.catch(error => {
			return next(error);
		})
	});

	router.get('/api/forums', function(req, res, next){
		logger.log('info','Get Blogs', 'verbose');
		var query = buildQuery(req.query, Forum.find())
		query
			.sort('dateCreated')
      		.populate('messages')
			.populate('personId', 'firstName, lastName, fullName, email')
			.exec(function(err, object){
				if (err) {
					return next(err);
				} else {
					res.status(200).json(object);
				}
			});
	});

	router.get('/api/forums/:id', requireAuth, function(req, res, next){
		logger.log('info','Get blog '+ req.params.id, 'verbose');
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
		logger.log('info','Create forum', "verbose");
		var forum =  new Forum(req.body);
		forum.save()
			.then(item => {	
				res.status(200).json(item);		
			}) 
			.catch(error => {
				return next(err);
			})
	});

	router.put('/api/forums', requireAuth, function(req, res, next){
		logger.log('info','Update forum '+ req.body._id, 'verbose');

		Forum.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false})
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			return next(error);
		})
	});

	router.get('/api/forumMessages', function(req, res, next){
		logger.log('info','Get Blogs', 'verbose');
		var query = buildQuery(req.query, ForumMessage.find())
		query
			.sort('dateCreated')
      		.populate('messages')
			.exec(function(err, object){
				if (err) {
					return next(err);
				} else {
					res.status(200).json(object);
				}
			});
	});

	router.get('/api/forumMessages/:id', requireAuth, function(req, res, next){
		logger.log('info','Get blog '+ req.params.id, 'verbose');
		ForumMessage.findById(req.params.id)
		.exec()
		.then(object => {
			res.status(200).json(object);
		})
		.catch(error => {
			return next(error);
		})
	});

	router.post('/api/forumMessages', requireAuth, function(req, res, next){
		logger.log('info','Create forum message', "verbose");
		var forum =  new ForumMessage(req.body); 
		forum.save()
			.then(item => {		
				Forum.findById(item.parentId)
				.then(topic => {
					if(!topic.messages) topic.messages = new Array();
					topic.messages.push(item._id);
					topic.save();
					res.status(200).json(item);	
				})
				.catch(error => {
					return next(error);
				})
			}) 
			.catch(error => {
				return next(error);
			})
	});

	router.put('/api/forumMessages', requireAuth, function(req, res, next){
		logger.log('info','Update forum '+ req.body._id, 'verbose');

		ForumMessage.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false})
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			return next(error);
		})
	});

};