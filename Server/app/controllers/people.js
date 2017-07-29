'use strict'

var express = require('express'),
  	router = express.Router(),
    mongoose = require('mongoose'),
    Model = mongoose.model('Person'),
    Note = mongoose.model('Note'),
    http = require('http'),
    PasswordReset =  mongoose.model('PasswordReset'),
    path = require('path'),
    logger = require('../../config/logger'),
    logAuth = require('../../config/log-authenticate'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    Promise = require('bluebird'),
    config = require('../../config/config'),
    Event = mongoose.model('Event'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    DuplicateRecordError = require(path.join(__dirname, "../../config", "errors", "DuplicateRecordError.js"));

    var requireAuth = passport.authenticate('jwt', { session: false }),
        requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/people', requireAuth,  function(req, res, next){
    logger.log('Get people','verbose');
    var query = buildQuery(req.query, Model.find())

    query
      .populate({ path: 'institutionId', model: 'Institution', select: 'name postalCode active'})
      .exec( function(err, object){
        if (err) { 
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      }); 
  });

  router.get('/api/people/bulkEmail', function(req, res, next){
    logger.log('Get people builkEmail', 'verbose');
    var query = buildQuery(req.query, Model.find());
    query.populate('institutionId',{institutionType: 1, memberType: 1, name: 1, region: 1, city: 1, country: 1})
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
        person.save(function ( err, object ){
          if (err) {
            return next(err);
          } else {
            res.status(200).json(object);
          }
        });
      }
    })
  });

  router.post('/api/people/register/facDev',  function(req, res, next){
    Model.find({institutionId: req.body.institutionId, roles: "PRIM"}, function(err, people){
      if(err){
        return next(err);
      } else {            
        if(people.length > 0){
          var facCoordName = people[0].fullName;
        }  else {
          var facCoordName = "";
        }
        var context = {facultyCoordinator: facCoordName, name: req.body.fullName, institutions: req.body.institution};
        var mailObj = {
          email: req.body.email, 
          context: context
        }    

       welcome(mailObj)

        var facCoordEmail;
        people.forEach(item => {
          facCoordEmail += item.email + ',';
        });

        if(people.length > 0){
            var context = {name: req.body.fullName, institution: req.body.institution};            
            var mailObj = {
              email: facCoordEmail,
              institution: req.body.institution,
              cc: req.body.cc,
              context: context
            }                                                                
           newCustomer(mailObj);
        }

      }
      res.status(201).json({message: "Email sent"});
    });
  });

   router.post('/api/people/facDev/activate',  function(req, res, next){
             
      var mailObj = {
        email: req.body.email,
        context: {name: req.body.name}
      }                          
                    
      newCustomerActivate(mailObj);
      res.status(201).json({message: "Email sent"});
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
          // .then(result => {
              person.audit.push(req.body.audit);
              person.save();
              res.status(200).json({message: "Email Sent"});
          // })
          // .catch(error => {
          //     return next(error);
          // });
        
    })
    .catch(error => {
       return next(error);
    })
  });

  router.post('/api/people/sendBulkEmail', requireAuth, function(req, res, next){
    logger.log('Sending bulk email', 'verbose');

    sendBulkEmails(req.body);
    res.status(201).json({message: "Emails sent"});
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
                // .then(emailResult => {
                    res.status(200).json(result);
                // })
                // .catch(error => {
                //     return next(error);
                // });  
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

  router.get('/api/getWeather/:city', function(req, res, next){
    logger.log("Getting weather for " + req.params.city, 'verbose')
    var city = req.params.city.split(' ').join('%20');
    return http.get({
        host: 'api.openweathermap.org',
        path: '/data/2.5/weather?q=' + req.params.city + '&APPID=0f85bb931f8faad7e35b6f685aa4e931'
    }, function(response) {
        // Continuously update stream with data
        var str = '';
        response.on('data', function(d) {
            str = JSON.parse(d);
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            res.status(200).json(str);
        });
    
    });

    reqGet.end();
    
    reqGet.on('error', function(e) {
        console.error(e);
        return next(err);
    });

  })

  router.get('/api/uccStaff/:uccRoles', function(req, res, next){
    logger.log('Getting UCC Staff', 'verbose');  
    let roles = req.params.uccRoles.split(':');
    Model.find({roles: {$in: roles}}).exec()
    .then(people => {    
      if(people){      
        var uccPeople = people.filter(item => {
          if(item.institutionId == config.UCC_ID) return true;
        })
      }
      res.status(200).json(uccPeople);
    })
    .catch(error => {
      return next(error);
    })

  })

  router.route('/api/users/login')
    .post(requireLogin, login);

  router.route('/api/users/logout').post(function(req, res, next){
    logAuth.log('logoff-' + req.body.email, 'info');
    res.status(201).json({message: "logout successful"});
  })

  router.get('/api/notes', requireAuth,  function(req, res, next){
    logger.log('Get note','verbose');
    var query = buildQuery(req.query, Note.find())
    query.exec( function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {       
          if(!object || object.length === 0){          
            res.status(200).json(new Array());
          } else {
            res.status(200).json(object);
          }
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
          res.status(201).json(object);
        }
      });
  });

  router.put('/api/notes', requireAuth, function(req, res, next){
    logger.log('Update note ' + req.body._id, 'verbose');  
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

  router.get('/api/events', requireAuth,  function(req, res, next){
    logger.log('Get events','verbose');
    var query = buildQuery(req.query, Event.find())
    query.exec( function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {       
          if(!object || object.length === 0){          
            res.status(200).json({"message": "No Events Found"});
          } else {
            res.status(200).json(object);
          }
        }
      });
  });

  router.post('/api/events', requireAuth, function(req, res, next){
    logger.log('Create Event', 'verbose');
    var event =  new Event(req.body);  
      event.save(function ( err, object ){
        if (err) {
           return next(err);
        } else {
          res.status(201).json(object);
        }
      });
  });

  router.put('/api/events', requireAuth, function(req, res, next){
    logger.log('Update event ' + req.body._id, 'verbose');  
    Event.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, event){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(event);
      }
    })
  });

  router.delete('/api/events/:id', requireAuth, function(req, res, next){
    logger.log('Delete event ' + req.params.id,'verbose');
    Event.remove({ _id: req.params.id }, function(err, result){
      if (err) {
         return next(err);
      } else {
        res.status(200).json({msg: "Event Deleted"});
      }
    })
  });

   var storage = multer.diskStorage({
    destination: function (req, file, cb) {

      var path = config.uploads + '/peopleImages';
     
      mkdirp(path, function(err) {
        if(err){
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
      cb(null, req.params.id + file.originalname.substring(file.originalname.indexOf('.')));
    }
  });

  var upload = multer({ storage: storage});

  router.post('/api/people/upload/:id',  upload.any(), function(req, res, next){
     writeLog.log('Upload File ', 'verbose');    
      Model.findById(req.params.id, function(err, person){   
        if(err){
          return next(err);
        } else {                
            person.file =  {
              originalilename: req.files[0].originalname,
              fileName: req.files[0].filename,
              dateUploaded: new Date()
            };             
            person.save(function(err, person) {
              if(err){
                return next(err);
              } else {
                res.status(200).json(person);
              }
            });
          }        
      });
  });
};
