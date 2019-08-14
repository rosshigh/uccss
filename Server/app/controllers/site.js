var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  passport = require('passport'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  logger = require('../../config/logger'),
  Model = mongoose.model('Site'),
  asyncHandler = require('express-async-handler');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/site', asyncHandler(async (req, res) => {
    var query = buildQuery(req.query, Model.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/api/site/current', requireAuth, asyncHandler(async (req, res) => {
    var query = buildQuery(req.query, Model.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/api/site/:id', requireAuth, asyncHandler(async (req, res) => {
    await Model.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/api/site', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info','Create Site Info');
    var item =  new Model(req.body);
    await item.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/api/site', requireAuth, asyncHandler(async (req, res) => {
    await Model.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, safe:true, multi:false}).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/api/site/:id', requireAuth, asyncHandler(async (req, res) => {
    await Model.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));

  //Message services
  router.get('/api/messages', requireAuth, asyncHandler(async (req, res) => {
    var query = buildQuery(req.query, Message.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/api/messages/current', requireAuth, asyncHandler(async (req, res) => {
    var query = buildQuery(req.query, Message.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/api/messages/:id', requireAuth, asyncHandler(async (req, res) => {
    await Message.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/api/messages', requireAuth, asyncHandler(async (req, res) => {
    var item =  new Message(req.body);
    await item.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/api/messages', requireAuth, asyncHandler(async (req, res) => {
    await Message.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/api/messages/:id', requireAuth, asyncHandler(async (req, res) => {
    await Message.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var path = config.uploads + '/site';
      
      mkdirp(path, function(err) {
        if(err){
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
      },
      filename: function (req, file, cb) {
          cb(null, file.originalname);
      }
  });

  var upload = multer({ storage: storage });

  router.post('/api/site/upload/:id', upload.any(), asyncHandler(async (req, res) => {
      await Model.findById(req.params.id).then(result => {
        for(var i = 0, x = req.files.length; i<x; i++){
          var file =  {
            originalFilename: req.files[i].originalname,
            fileName: req.files[i].filename,
            dateUploaded: new Date()
          };
          result.file = file;
        }
        result.save().then(result => {
            res.status(200).json(result);
        });
      })
  }));
};
