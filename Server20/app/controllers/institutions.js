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
    .populate({ path: "packageId", model: "InstitutionPackage" })

    await query.exec().then(result => {
        res.status(200).json(result);
      })
    }));

    router.get('/institutions/:id', asyncHandler(async (req, res) => {
      Institutions.findById(req.params.id).then(result => {
console.log(result)        
        res.status(200).json(result);
      })
    }));
}