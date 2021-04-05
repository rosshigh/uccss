var express = require('express'),
  logger = require('../../config/logger'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  Institutions = mongoose.model('Institution'),
  InstitutionPackage = mongoose.model('InstitutionPackage'),
  //   Packages = mongoose.model('Packages'),
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.use('/api', router);

  router.get('/institutions', asyncHandler(async (req, res) => {
    let query = buildQuery(req.query, Institutions.find())
    query
      .populate({ path: "packageId", model: "Packages" })
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/institutions/:id', asyncHandler(async (req, res) => {
    Institutions.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/institutions', asyncHandler(async (req, res) => {
    var institution = new Institutions(req.body);
    institution.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/apj/institutions', requireAuth, function (req, res) {
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

  router.put('/institutions', asyncHandler(async (req, res) => {
    Institutions.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false }).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/institutions/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Delete institution [%s]', req.params.id);
    await Institutions.remove({ _id: req.params.id }).then(result => {
        res.status(200).json({ msg: "Institutions Deleted" });
    })
}));
}