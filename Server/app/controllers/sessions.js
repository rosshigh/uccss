var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  Model = mongoose.model('Session'),
  asyncHandler = require('express-async-handler');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/sessions', asyncHandler(async (req, res) => {
    var query = buildQuery(req.query, Model.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/api/sessions/active', requireAuth, asyncHandler(async (req, res) => {
    await Model.find( { $or:[ {'sessionStatus':'Requests'}, {'sessionStatus':'Active'}, {'sessionStatus':'Next'}]})
      .sort(req.query.order)
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.get('/api/sessions/:id', requireAuth, asyncHandler(async (req, res) => {
    Model.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/api/sessions', requireAuth, asyncHandler(async (req, res) => {
    var session =  new Model(req.body);
    session.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/api/sessions', requireAuth, asyncHandler(async (req, res) => {
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, safe:true, multi:false}).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/api/sessions/:id', requireAuth, asyncHandler(async (req, res) => {
    Model.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));
};
