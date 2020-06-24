var express = require('express'),
  logger = require('../../config/logger'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  Model = mongoose.model('Institution'),
  InstitutionPackage = mongoose.model('InstitutionPackage'),
//   Packages = mongoose.model('Packages'),
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.use('/api', router);

  router.get('/institutions', asyncHandler(async (req, res) => {
    let query = buildQuery(req.query, Model.find())
    query
    .populate({ path: "packageId", model: "InstitutionPackage" })

    await query.exec().then(result => {
        res.status(200).json(result);
      })
    }));
}