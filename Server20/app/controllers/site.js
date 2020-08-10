var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  logger = require('../../config/logger'),
  SiteItem = mongoose.model('Site'),
  asyncHandler = require('express-async-handler');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/api', router);

  router.get('/site', asyncHandler(async (req, res) => {
    var query = buildQuery(req.query, SiteItem.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/site/:id', asyncHandler(async (req, res) => {
    await SiteItem.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/site', asyncHandler(async (req, res) => {
    logger.log('info','Create Site Info');
    var item =  new SiteItem(req.body);
    await item.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/site',asyncHandler(async (req, res) => {
    await SiteItem.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, safe:true, multi:false}).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/site/:id', asyncHandler(async (req, res) => {
    await SiteItem.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));
}