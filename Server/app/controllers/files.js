var express = require('express'),
  debug = require('debug')('is4ua'),
  router = express.Router(),
  mongoose = require('mongoose'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  Product = mongoose.model('Product'),
  Download = mongoose.model('Download'),
  HelpTicket = mongoose.model('HelpTicket');
  Site = mongoose.model('Site');

module.exports = function (app, config) {
  app.use('/', router);

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(req.params.type === 'product') {
        var path = config.uploads + '/productFiles/' + req.params.container;
      } else if(req.params.type === 'download'){
        var path = config.uploads + '/downloads';
      } else if(req.params.type === 'news'){
        var path = config.uploads + '/site';
      }
      else {
        var path = config.uploads + '/helpTickets/' + req.params.container;
      }
      mkdirp(path, function(err) {
        if(err){
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
      if(req.params.type === 'helpTicket') {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.substring(file.originalname.indexOf('.')));
      } else {
        cb(null, file.originalname);
      }
    }
  });
  var upload = multer({ storage: storage });

  router.post('/api/upload/:id/:container/:type', upload.any(), function(req, res, next){
    if(req.params.type === 'product'){
      Product.findById(req.params.id, function(err, product){
        if(err){
          return next(err);
        } else {
          req.containerName = product.name;
          for(var i = 0, x = req.files.length; i<x; i++){
            var file =  {
              originalFilename: req.files[i].originalname,
              fileName: req.files[i].filename
            };
            product.files.push(file);
          }
          product.save(function(err, product) {
            if(err){
              return next(err);
            } else {
              res.status(200).json(product);
            }
          });
        }
      });
    } else if (req.params.type === 'download'){
      Download.findById(req.params.id, function(err, download){
        if(err){
          return next(err);
        } else {
          for(var i = 0, x = req.files.length; i<x; i++){
            var file =  {
              originalFilename: req.files[i].originalname,
              fileName: req.files[i].filename,
              dateUploaded: new Date()
            };
            download.file = file;
          }
          download.save(function(err, download) {
            if(err){
              return next(err);
            } else {
              res.status(200).json(download);
            }
          });
        }
      });
    }  else if (req.params.type === 'news'){
      Site.findById(req.params.id, function(err, site){
        if(err){
          return next(err);
        } else {
          for(var i = 0, x = req.files.length; i<x; i++){
            var file =  {
              originalFilename: req.files[i].originalname,
              fileName: req.files[i].filename,
              dateUploaded: new Date()
            };
            site.file = file;
          }
          site.save(function(err, site) {
            if(err){
              return next(err);
            } else {
              res.status(200).json(site);
            }
          });
        }
      });
    } else {
      HelpTicket.findById(req.params.id, function(err, helpticket){
        if(err){
          return next(err);
        } else {
          if(req.query.content){
            var id = req.query.content;
            var content = helpticket.content.id(id);
            for(var i = 0, x = req.files.length; i<x; i++){
              var file =  {
                originalFilename: req.files[i].originalname,
                fileName: req.files[i].filename,
                dateUploaded: new Date()
              };
              content.files.push(file);
            }
            helpticket.save(function(err, helpticket) {
              if(err){
                return next(err);
              } else {
                res.status(200).json(helpticket);
              }
            });
          } else {
            res.status(200).json({message: 'file uploaded'});
          }
        }
      });
    }

  });

};
