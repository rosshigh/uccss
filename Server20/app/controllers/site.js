var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  passport = require('passport'),
  logger = require('../../config/logger'),
  SiteItem = mongoose.model('Site'),
  asyncHandler = require('express-async-handler');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/site', asyncHandler(async (req, res) => {
    var query = buildQuery(req.query, SiteItem.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/api/site/:id', asyncHandler(async (req, res) => {
    await Model.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));
}