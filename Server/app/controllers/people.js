var express = require('express'),
  	router = express.Router(),
    mongoose = require('mongoose'),
    Model = mongoose.model('Person'),
    Note = mongoose.model('Note'),
    PasswordReset =  mongoose.model('PasswordReset'),
    path = require('path'),
    logger = require('../../config/logger'),
    logAuth = require('../../config/log-authenticate'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    Promise = require('bluebird'),
    config = require('../../config/config'),
    DuplicateRecordError = require(path.join(__dirname, "../../config", "errors", "DuplicateRecordError.js"));

    var requireAuth = passport.authenticate('jwt', { session: false }),
        requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/people', requireAuth,  function(req, res, next){
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

  router.get('/api/people/institution/:id', requireAuth, function(req, res, next){
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

  router.get('/api/people/checkName', function(req, res, next){
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
 
  router.post('/api/people', requireAuth, function(req, res, next){
    logger.log('Create Person', 'verbose');
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
          }
        });
      }
    })
  });

  router.put('/api/people', requireAuth, function(req, res, next){
    logger.log('Update Person ' + req.body._id, 'verbose');    
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, person){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(person);
      }
    })
  });

  router.put('/api/people/password/:id',  function(req, res, next){
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

  router.delete('/api/people/:id', requireAuth, function(req, res, next){
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

  router.post('/api/passwordReset',  function(req, res, next){
    logger.log('Password Reset for ' + req.body.email, 'verbose');
     Model.find({ email : req.body.email}).exec()
     .then(person => {      
       if(person){
          var passwordreset = PasswordReset({personId: person[0]._id});
          passwordreset.validationCode =  new Buffer(passwordreset._id + person[0]._id).toString('base64');       
          passwordreset.save()
          .then(result => {
              var context = {fullName: person[0].fullName, result: result, host: config.corsDomain };
              result.fullName = person[0].fullName;
              var mailObj = {
                email: person[0].email,
                subject: 'Password Reset',
                context: context
              }     
              passwordReset(mailObj)
                .then(emailResult => {
                    res.status(200).json(result);
                })
                .catch(error => {
                    return next(error);
                });  
          })
          .catch(error => {
            return next(error);
          })
       } else {
         res.status(404).json({message: "Email not found" });
       }
     })
     .catch(error => {
       return next(error);
     })
  });

  router.get('/api/passwordReset/:id',  function(req, res, next){
    logger.log('Password Reset', 'verbose');  
    PasswordReset.findById(req.params.id).exec()
    .then(result => {
       if(result){
          Model.findById(result.personId).exec()
          .then(person => {
            res.status(200).json(person);
          })
          .catch(error => {
            res.status(404).json({message: "Couldn't find the user"});
          })
       } else {
          res.status(404).json({message: "Validation code not found"});
       }
      
    })
    .catch(error => {
       return next(error);
    })
  });

  router.route('/api/users/login')
    .post(requireLogin, login);

  router.route('/api/users/logout').post(function(req, res, next){
    logAuth.log('logoff-' + req.body.email, 'info');
    console.log(req.body.email);
    res.status(201).json({message: "logout successful"});
  })

  router.get('/api/notes', requireAuth,  function(req, res, next){
    logger.log('Get note','verbose');
    var query = buildQuery(req.query, Note.find())
    query.exec( function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.post('/api/notes', requireAuth, function(req, res, next){
    logger.log('Create Note', 'verbose');
    var note =  new Note(req.body);  
      note.save(function ( err, object ){
        if (err) {
           return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.put('/api/notes', requireAuth, function(req, res, next){
    logger.log('Update note ' + req.body._id, 'verbose');  
    console.log(req.body);
    Note.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, person){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(person);
      }
    })
  });

  router.delete('/api/notes/:id', requireAuth, function(req, res, next){
    logger.log('Delete note ' + req.params.id,'verbose');
    Note.remove({ _id: req.params.id }, function(err, result){
      if (err) {
         return next(err);
      } else {
        res.status(200).json({msg: "Note Deleted"});
      }
    })
  });

};
