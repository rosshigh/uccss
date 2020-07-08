var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  System = mongoose.model('System'),
  passport = require('passport'),
  Product = mongoose.model('Product'),
  //   multer = require('multer'),
  //   mkdirp = require('mkdirp'),
  logger = require('../../config/logger'),
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.use('/api', router);

  router.get('/products', asyncHandler(async (req, res) => {

    var query = buildQuery(req.query, Product.find())
    query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/products/:id', asyncHandler(async (req, res) => {
    logger.log('info','Get product ' + req.params.id);
    
    Product.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/products', asyncHandler(async (req, res) => {
    logger.log('info', 'Create a product');

    var product = new Product(req.body);
    product.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/products', asyncHandler(async (req, res) => {
    logger.log('info', 'Update Product ' + req.body._id);

    Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }).then(result => {
      res.status(200).json(result);
    })
  }));
}