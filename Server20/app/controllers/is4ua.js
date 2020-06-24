var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('is4ua'),
  // passport = require('passport'),
  asyncHandler = require('express-async-handler');

  // var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/api', router);
    
  router.get('/is4ua', asyncHandler(async (req, res) => {
    await Model.find().then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/is4ua', asyncHandler(async (req, res) => {
    var is4ua =  new Model(req.body);
    await person.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/is4ua', asyncHandler(async (req, res) => {
    var is4ua = new Model(req.body);

    await Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}).then(result => {
      res.status(200).json(result);
    })
  }));

};
