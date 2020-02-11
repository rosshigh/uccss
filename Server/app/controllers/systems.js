var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('System'),
  passport = require('passport'),
  ChangeCategory = mongoose.model('ChangeCategory'),
  Change = mongoose.model('Change'),
  logger = require('../../config/logger'),
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/systems', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get systems');
    var query = buildQuery(req.query, Model.find())
    await query
      .populate({ path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName' })
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.get('/api/systems/product/:systems', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Getting product systems');
    var productSystems = req.params.systems.split(':');
    await Model.find({ sid: { $in: productSystems } })
      .populate({ path: 'clients.assignments.assignment', model: 'ClientRequestDetail' })
      .populate({ path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName' })
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.get('/api/systems/:id', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get system ' + req.params.id);
    await Model.findById(req.params.id)
      .populate({ path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName' })
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.post('/api/systems', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Create system');

    if (req.body) {
      req.body.clients = new Array();
      var system = new Model(req.body);
      await system.save().then(result => {
        res.status(200).json(result);
      })
    }
  }));

  router.put('/api/systems/product', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Update systems');

    if (req.body && Array.isArray(req.body)) {
      var tasks = new Array();
      req.body.forEach(item => {
        if (item.operation === 'add') {
          tasks.push(Model.update({ _id: item.systemId }, { $push: { productId: item.productId } }));
        } else {
          tasks.push(Model.update({ _id: item.systemId }, { $pull: { productId: item.productId } }));
        }
      });
      await Promise.all(tasks).then(result => {
        res.status(200).json(result);
      })
    }
  }));

  router.put('/api/systems', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Update Systems ' + req.body._id);
    if (req.body) {
      await Model.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }).then(result => {
        Model.findById(req.body._id)
          .populate({ path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName' })
          .exec()
          .then(result => {
            res.status(200).json(result)
          })
          .catch(error => {
            return next(error);
          })
      })
    }
    return next(error);
  }));

  router.put('/api/systems/client', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Update Systems Client' + req.body.systemId);
    if (req.body) {
      Model.findById(req.body.systemId)
        .exec()
        .then(result => {
          for (let i = 0; i < result.clients.length; i++) {
            if (result.clients[i].client = req.body.client) {
              result.clients[i].clientStatus = req.body.status;
            }
          }
          await Model.findOneAndUpdate({ _id: req.body.systemId }, result, { new: true, safe: true, multi: false }).then(result => {
            res.status(200).json("Client updated");
          })
            .catch(error => {
              return next(error);
            })
        })
        .catch(error => {
          return next(error);
        })
    }
    return next(error);
  }));

  router.delete('/api/systems/:id', requireAuth, asyncHandler(async (req, res) => {
    await Model.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));

  //ChangeCategory
  router.get('/api/changeCategory', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get changeCategory');
    var query = buildQuery(req.query, ChangeCategory.find())
    await query
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.get('/api/changeCategory/:id', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get changeCategory ' + req.params.id);
    await ChangeCategory.findById(req.params.id)
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.post('/api/changeCategory', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Create changeCategory');
    var category = new ChangeCategory(req.body);
    await category.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/api/changeCategory', requireAuth, asyncHandler(async (req, res) => {
    await ChangeCategory.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/api/changeCategory/:id', requireAuth, asyncHandler(async (req, res) => {
    await ChangeCategory.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));

  //Change
  router.get('/api/change', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get change');
    var query = buildQuery(req.query, Change.find())
    query.populate({ path: 'personId', model: 'Person', select: 'firstName lastName fullName' })
    await query
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.get('/api/change/:id', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get change ' + req.params.id);
    await Change.findById(req.params.id)
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

  router.post('/api/change', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Create change');
    console.log(req.body)
    var category = new Change(req.body);
    await category.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/api/change', requireAuth, asyncHandler(async (req, res) => {
    await Change.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/api/change/:id', requireAuth, asyncHandler(async (req, res) => {
    await Change.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));
};
