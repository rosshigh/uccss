var express = require('express'),
  logger = require('../../config/logger'),
  fs = require('fs'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Document = mongoose.model('Document'),
  Category = mongoose.model('DocCategory'),
  passport = require('passport'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
  app.use('/api', router);

  router.get('/documentCategory', asyncHandler(async (req, res) => {
    logger.log('info', 'Get documents');
    var query = buildQuery(req.query, Category.find())
    await query.exec().then(result => {
console.log(result)      
      res.status(200).json(result);
    })
  }));

  router.put('/documentCategory', asyncHandler(async (req, res) => {
    logger.log('info', 'Update Document [%s]', req.body._id);
    await Category.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/documentCategory', asyncHandler(async (req, res) => {
    logger.log('info', 'Create Document');
    var document = new Category(req.body);
    await document.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/documentCategory/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Delete documentsCategory [%s]', req.params.id);
    Category.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    });
  }));

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let paths = req.params.container.split('$@').join('/');
      var path = config.uploads + "/documents/" + paths;
      mkdirp(path, function (err) {
        if (err) {
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
      let fileName = file.originalname.split('.');
      cb(null, fileName[0] + " (" + req.params.version + ")." + fileName[fileName.length - 1]);
    }
  });

  var upload = multer({ storage: storage });

  router.post('/documentCategory/file/:container/:level1/:level2', function (req, res, next) {
    var fs = require('fs');
    const formidable = require('formidable');
    const form = formidable({ multiples: true });
    form.maxFileSize = 800 * 1024 * 1024; //changes the max file size to 800
    form.parse(req, function (err, fields, files) {
      let oldpath = files.file0.path;   
      let newpath = config.uploads + "/" + req.params.container + "/" + req.params.level1 + "/" + req.params.level2;
      mkdirp(newpath).then(made => { 
        newpath = newpath + "/" + files.file0.name
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.status(201).json({ message: 'file uploaded' });
        }); 
      })
      .catch(error => {
        return next(error);
      })
    });
  })


}