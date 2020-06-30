var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  logger = require('../../config/logger'),
  Model = mongoose.model('Session'),
  Semester = mongoose.model('SemesterConfig'),
  asyncHandler = require('express-async-handler');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/api', router);

  router.get('/sessions', asyncHandler(async (req, res) => {
    var query = buildQuery(req.query, Model.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/sessions/active', asyncHandler(async (req, res) => {
    await Model.find( { $or:[ {'sessionStatus':'Requests'}, {'sessionStatus':'Active'}, {'sessionStatus':'Next'}]})
      .sort(req.query.order)
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.get('/sessions/:id', asyncHandler(async (req, res) => {
    Model.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/sessions', asyncHandler(async (req, res) => {
    var session =  new Model(req.body);
    session.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/sessions', asyncHandler(async (req, res) => {
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, safe:true, multi:false}).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/sessions/:id', asyncHandler(async (req, res) => {
    Model.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/semesterConfig', asyncHandler(async (req, res) => {
    logger.log('info','Get config');
    var query = buildQuery(req.query, Semester.find());
    query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/semesterConfig', asyncHandler(async (req, res) => {
    logger.log('info','Save all parameters');
    var tasks = new Array();
    req.body.forEach(function(item,index){
      tasks.push(Semester.findOneAndUpdate({_id: item._id}, item, {safe:true, new:true}));
    });
     Promise.all(tasks)
     .then(function(results){
        res.status(200).json(results);
     })
  }));

router.post('/semesterConfig', asyncHandler(async (req, res) => {
    logger.log('info','Create config','verbose');
    var semester =  new Semester(req.body);
    semester.save().then(result => {
      res.status(200).json(result);
    })
  }));
};