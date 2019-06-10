var express = require('express'),
  logger = require('../../config/logger'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  Model = mongoose.model('Institution'),
  InstitutionPackage = mongoose.model('InstitutionPackage'),
  Packages = mongoose.model('Packages');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/institutions', function (req, res) {
    var query = buildQuery(req.query, Model.find())
    query
      .populate({ path: "packageId", model: "InstitutionPackage" })
    query.exec(function (err, object) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/institutions/:id', requireAuth, function (req, res) {
    Model.findById(req.params.id, function (err, object) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/institutions', requireAuth, function (req, res) {
    var institution = new Model(req.body);
    institution.save(function (err, object) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/apj/institutions', requireAuth, function (req, res) {
    var institution = new Model(req.body);
    Packages.findById(institution.packageId, function (err, package) {
      var newObj = {
        packageId: institution.packageId,
        institutionId: institution._id,
        amount: package.price
      }
      institutionPackage = new InstitutionPackage(newObj);
      institutionPackage.save(function (err, result) {
        institution.packageId = result._id;
        institution.save(function (err, object) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(object);
          }
        });
      });
    })
  });

  router.put('/api/institutions', requireAuth, function (req, res) {
    Model.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false }, function (err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.put('/api/apj/institutions', requireAuth, function (req, res) {
    InstitutionPackage.findOne({
      $and: [
        { institutionId: req.body._id },
        { dateEnded: null }
      ]
    }, function (err, institutionPackage) {
      if (err) return next();
      if (institutionPackage != null) {
        if (institutionPackage._id != req.body.packageId) {
          // var instPackage = institutionPackage;
          institutionPackage.dateEnded = new Date();
          institutionPackage.save();
        }
      }
      if (req.body.packageId) {
        Packages.findById(req.body.packageId.packageId, function (err, package) {
          var newObj = {
            packageId: package._id,
            institutionId: req.body._id,
            amount: package.price
          }
          newInstitutionPackage = new InstitutionPackage(newObj);
          newInstitutionPackage.save(function (err, object) {
            if (err) {
              return next(err);
            }

            req.body.packageId = object._id;
            Model.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false }, function (err, result) {
              if (err) {
                res.status(500).json(err);
              } else {
                res.status(200).json(result);
              }
            })
          });
        })
      } else {
        Model.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false }, function (err, result) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(result);
          }
        })
      }

    });
  });

  router.delete('/api/institutions/:id', requireAuth, function (req, res, next) {
    logger.log('info', 'Delete institution [%s]', req.params.id);
    Model.remove({ _id: req.params.id }, function (err) {
      if (err) {
        return next(err);
      } else {
        res.status(204).json({ message: 'Record deleted' });
      }
    });
  });

};
