var express = require('express'),
  logger = require('../../config/logger'),
  fs = require('fs'),
  router = express.Router(),
  mongoose = require('mongoose'),
  // Document = mongoose.model('Document'),
  Category = mongoose.model('DocCategory'),
  passport = require('passport'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
  app.use('/api', router);

  router.get('/documentCategories', asyncHandler(async (req, res) => {
    logger.log('info', 'Get documents');
    var query = buildQuery(req.query, Category.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/documentCategories', asyncHandler(async (req, res) => {
    logger.log('info', 'Update Document [%s]', req.body._id);
    await Category.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/documentCategories', asyncHandler(async (req, res) => {
    logger.log('info', 'Create Document');
    var document = new Category(req.body);
    await document.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/documentCategories/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Delete dcoument [%s]', req.params.id);
    Category.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    });
  }));

  router.post('/documentCategories/file/:indices', asyncHandler(async (req, res) => {
    // level1/:level2/:level3
    let indices = req.params.indices.split(':');
    await Category.findOne({ DocCode: indices[0] }).then(document => {
      const fs = require("fs")
      const formidable = require('formidable');
      const form = formidable(); 
      const path = config.uploads + '/documents/' + indices[0]+ "/" + indices[1] + "/" + indices[2];      
      try {
        if (fs.existsSync(path)) {
          console.log("Directory exists.")
        } else {        
          fs.mkdirSync(path, { recursive: true });
        }
      } catch(e) {
        console.log(e)
      }
      
      form.maxFileSize = 800 * 1024 * 1024;
      form.parse(req);
      form.on('fileBegin', function (name, file) {
        let fileName = path + '/' + file.name;
        // let fileName = indices[0]+ "/" + indices[1] + "/" + indices[2] + '/' + file.name;
        // let fileName = req.params.level1 + "-" + req.params.level2 + "-" + req.params.level3 + '-' + file.name;
        // file.path = config.uploads + '/documents/' + fileName;
        file.path = fileName;
        document.subCategories[indices[1]].subSubCategories[indices[2]].documents[indices[3]].file.path = indices[0]+ "/" + indices[1] + "/" + indices[2];
        document.subCategories[indices[1]].subSubCategories[indices[2]].documents[indices[3]].file.dateCreated = new Date()
      });

      form.on('file', function (name, file) {

      });

      form.on('end', function () {
        document.markModified('subCategories');
        document.save().then(result => {
          res.status(201).json({ message: 'file uploaded' });
        });
      });
    });

  }));


}