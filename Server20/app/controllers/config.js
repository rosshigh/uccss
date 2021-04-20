var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  logger = require('../../config/logger'),
  Config = mongoose.model('Config'),
  asyncHandler = require('express-async-handler');

//   var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/api', router);

  router.get('/config', asyncHandler(async (req, res) => {
    logger.log('info', 'Get config');
    var query = buildQuery(req.query, Config.find());
    query.sort(req.query.order)
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No parameters were found" });
        }
      })
  }));

  router.get('/config/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Get config ' + req.params.parameter);
    Config.find()
      .where('_id').eq(req.params.id)
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No parameters were found" });
        }
      })
  }));

  router.post('/config', asyncHandler(async (req, res) => {
    logger.log('info', 'Create config');
    var config = new Config(req.body);
    await config.save()
      .then(object => {
        res.status(200).json(object);
      });
  }));

  router.put('/config', asyncHandler(async (req, res) => {
    logger.log('info', 'Update parameter ' + req.body._id);
    Config.findOneAndUpdate({ _id: req.body._id }, req.body).exec()
      .then(result => {
        res.status(200).json(result);
      })
  }));

  router.put('/config/saveAll', asyncHandler(async (req, res) => {
    logger.log('info', 'Save all parameters');
    var tasks = new Array();
    req.body.parameters.forEach(item => {
      tasks.push(Model.findOneAndUpdate({ _id: item._id }, item, { safe: true, new: true }));
    });
    Promise.all(tasks)
      .then(function (results) {
        res.status(200).json(results);
      })
  }));

  router.delete('/config/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Delete parameter ' + req.params.id);
    await Config.remove({ _id: req.params.id }).then(result => {
      res.status(200).json({ msg: "Parameter Deleted" });
    })
  }));
}