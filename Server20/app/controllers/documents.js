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

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('tehre')
      let paths = req.params.container.split('$@').join('/');
      var path = config.uploads + "/documents/" + paths;
      console.log(paths);
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
      console.log(fileName)
      cb(null, fileName[0] + " (" + req.params.version + ")." + fileName[fileName.length - 1]);
    }
  });

  var upload = multer({ storage: storage });

  //upload.any(),

  router.post('/documentCategory/file/:container/:subcontainer', function (req, res, next) {
    var fs = require('fs');
    const formidable = require('formidable');
    const form = formidable({ multiples: true });
    form.parse(req, function (err, fields, files) {
      let oldpath = files.file0.path;
      let newpath = config.uploads + "/documents/" + req.params.container + "/" + req.params.subcontainer;
      mkdirp(newpath).then(made => {
        console.log(made)
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