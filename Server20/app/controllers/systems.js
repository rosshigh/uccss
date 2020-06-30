var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  System = mongoose.model('System'),
  passport = require('passport'),
  Change = mongoose.model('Change'),
  logger = require('../../config/logger'),
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.use('/api', router);

  router.get('/systems', asyncHandler(async (req, res) => {
    logger.log('info', 'Get systems');
    var query = buildQuery(req.query, System.find())
    await query
      .populate({ path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName' })
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.get('/systems/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Get system ' + req.params.id);
    await System.findById(req.params.id)
      .populate({ path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName' })
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.post('/systems', asyncHandler(async (req, res) => {
    logger.log('info', 'Create system');

    if (req.body) {
      req.body.clients = new Array();
      var system = new System(req.body);
      await system.save().then(result => {
        res.status(200).json(result);
      })
    }
  }));

  router.put('/systems', asyncHandler(async (req, res) => {
    logger.log('info', 'Update Systems ' + req.body._id);
    if (req.body) {
      await System.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }).then(result => {
        System.findById(req.body._id)
          .populate({ path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName' })
          .exec()
          .then(result => {
            res.status(200).json(result)
          })
          .catch(error => {
            return next(error);
          })
      })
    } else {
      return next(error);
    }
  }));

}