var express = require('express'),
  	router = express.Router(),
    mongoose = require('mongoose'),
    Model = mongoose.model('Person'),
    path = require('path'),
    logger = require('../../config/logger'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    Promise = require('bluebird'),
    DuplicateRecordError = require(path.join(__dirname, "../../config", "errors", "DuplicateRecordError.js"));

    var requireAuth = passport.authenticate('jwt', { session: false }),
        requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/people', requireAuth,  function(req, res){
    logger.log('Get people','verbose');
    var query = buildQuery(req.query, Model.find())
    query.exec( function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/people/institution/:id', requireAuth, function(req, res){
    logger.log('Get people','verbose');
    Model.find()
      .sort(req.query.order)
      .where('institutionId').eq(req.params.id)
      .exec(function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/people/checkEmail',  function(req, res, next){
    logger.log('Get person for email =' + req.params.email,'verbose');
    var value = req.query.email;
    Model.find({ email : value})
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          if(object.length){
            res.status(409).json({status: 'exists'});
          } else {
            res.status(200).json({status: 'available'});
          }
        }
      });
  });

  router.get('/api/people/checkName', function(req, res){
     var query = buildQuery(req.query, Model.find())
    query.exec( function(err, object){
        if (err) {
           return next(err);
        } else {
          if(object.length){
            res.status(409).json({status: 'exists'});
          } else {
            res.status(200).json({status: 'available'});
          }
        }
      });
  })

  router.get('/api/people/:id', requireAuth, function(req, res, next){
    logger.log('Get person [%s]', req.params.id,'verbose');
    Model.findById(req.params.id, function(err, object){
        if (err) {
         return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.post('/api/people', requireAuth, function(req, res){
    logger.log('Create Person','verbose');
    var person =  new Model(req.body);  
      person.save(function ( err, object ){
        if (err) {
           return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.post('/api/people/register',  function(req, res, next){
    logger.log('Register Person','verbose');
    Model.find({ email : req.body.email}, function(err, person){
      if(err) {
        return next(err);
      } if (person.length){
        return next(new DuplicateRecordError("409"));
      } else {
        var person =  new Model(req.body);          
        person.save( function ( err, object ){
          if (err) {
             return next(err);
          } else {
            var mailObj = {
                personId: object._id,
                email: object.email,
                subject: 'Account Created',
                type: 'welcome',
                context: object
              }     
              welcome(mailObj)
                .then(result => {
                    res.status(200).json(object);
                })
                .catch(error => {
                    return next(error);
                });     
            // sendMail(mailObj);
            // res.status(200).json(object);
          }
        });
      }
    })
  });

  router.put('/api/people', requireAuth, function(req, res){
    logger.log('Update Person ' + req.body._id, 'verbose');    
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, person){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(person);
      }
    })
  });

  router.put('/api/people/password/:id', requireAuth, function(req, res){
    logger.log('Update Person password [%s]', req.params.id,'verbose');
    Model.findById(req.params.id, function(err, result){
      if (err) {
         return next(err);
      } else {
        result.password = req.body.password;
        result.save(function(err, person){
          if (err) {
             return next(err);
          } else {
            res.status(200).json(result);
          }
        });
      }
    })
  });

  router.delete('/api/people/:id', requireAuth, function(req, res){
    logger.log('Delete person [%s]', req.params.id,'verbose');
    Model.remove({ _id: req.params.id }, function(err, result){
      if (err) {
         return next(err);
      } else {
        res.status(200).json({msg: "Person Deleted"});
      }
    })
  });

  router.put('/api/people/sendMail', requireAuth, function(req, res, next){
    logger.log("Sending email to " + req.body.id, "verbose");
    Model.findById(req.body.id).exec()
    .then(person => {
        var obj = {
          email: req.body.email,
          type: 'generic',
          subject: req.body.subject,
          context: {
            name: person.fullName,
            message: req.body.message
          }
        };
  
        genericEmail(obj)
          .then(result => {
              person.audit.push(req.body.audit);
              person.save();
              res.status(200).json({message: "Email Sent"});
          })
          .catch(error => {
              return next(error);
          });
        
    })
    .catch(error => {
       return next(error);
    })
  });

  router.route('/api/users/login')
    .post(requireLogin, login);
};
