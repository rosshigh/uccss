'use strict'

var express = require('express'),
  	router = express.Router(),
    mongoose = require('mongoose'),
    Model = mongoose.model('Person'),
    PersonArchive = mongoose.model('PersonArchive'),
    Note = mongoose.model('Note'),
    TechNote = mongoose.model('TechNote'),
    TechNoteCategory = mongoose.model('TechNoteCategory'),
    http = require('http'),
    PasswordReset =  mongoose.model('PasswordReset'),
    path = require('path'),
    logger = require('../../config/logger'),
    logAuth = require('../../config/log-authenticate'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    Notifications =  mongoose.model('Notification'),
    Event = mongoose.model('Event'),
    EmailLog = mongoose.model('EmailLog'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    DuplicateRecordError = require(path.join(__dirname, "../../config", "errors", "DuplicateRecordError.js"));

    var AsyncPolling = require('async-polling');

    var requireAuth = passport.authenticate('jwt', { session: false }),
        requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app, config) {
  app.use('/', router);

  AsyncPolling(function (end) {
    logger.log('info',"Check for notifications...");
    var query = Event.find({scope: 'u', eventActive: true});
    query.exec( function(err, object){    
      if(!object || object.length === 0){          
        logger.log('info','No events for ' + new Date())
      } else {
        let today = new Date();
        let todayYear = today.getFullYear();
        let todayDay = today.getDate();
        object.forEach(item =>  {
          let startDate = new Date(item.start);
          let year = startDate.getFullYear();
          let day = startDate.getDate() + 1;
          if(todayYear === year && todayDay === day){
            logger.log('info','This event occurs today');
            var mailObj = {
              email: config.emailNotification,  
              MESSAGE: item.notes,
              subject: item.title
            }    
            sendEmail(mailObj);
            item.eventActive = false;
            Event.findOneAndUpdate({_id: item._id}, item, {safe:true, multi:false}, function(err, event){
              if(err){
                console.log('info',err);
              } else {
                logger.log('info','Event updated'); 
              }
            });
          }
        })
      }
    });
    end();
  }, 86400000).run();
  
  router.get('/api/people',   function(req, res, next){
    logger.log('info','Get people','verbose');
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
    logger.log('info','Get people builkEmail', 'verbose');
    var query = buildQuery(req.query, Model.find());
    query.select('lastName firstName institutionId fullName personStatus email phone roles')
    query.populate('institutionId',{institutionStatus: 1, institutionType: 1, memberType: 1, name: 1, region: 1, city: 1, country: 1})
    query.exec( function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/people/institution/:id', requireAuth, function(req, res, next){
    logger.log('info','Get people','verbose');
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
    logger.log('info','Get person for email =' + req.params.email,'verbose');
    var value = req.query.email;
  
    var query = Model.findOne({email: {$regex: new RegExp('^' + value.toLowerCase(), 'i')}});
    // Model.find({ email : value})
    query
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          if(object){
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
  });

  router.get('/api/people/emailLog', requireAuth,  function(req, res, next){
    logger.log('info','Get people email log','verbose');
  
    var query = buildQuery(req.query, EmailLog.find())
    query
      .exec( function(err, object){
        if (err) { 
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      }); 
  });

  router.get('/api/people/:id', requireAuth, function(req, res, next){
    logger.log('info','Get person [%s]', req.params.id,'verbose');
    Model.findById(req.params.id, function(err, object){
        if (err) {
         return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });
 
  router.post('/api/people', requireAuth, function(req, res, next){ 
    logger.log('info','Create Person', 'verbose');
    var person =  new Model(req.body);  
      person.save(function ( err, object ){
        if (err) {
           return next(err);
        } else {
          var query = Model.findById(object._id);
          query
            .populate({ path: 'institutionId', model: 'Institution', select: 'name postalCode active'})
            .exec( function(err, object){
              if (err) { 
                res.status(500).json(err);
              } else {
                res.status(200).json(object);
              }
            }); 
          // .populate({ path: 'institutionId', model: 'Institution', select: 'name postalCode active'})
          // res.status(200).json(object); 
        }
      });
  });

  router.post('/api/people/register',  function(req, res, next){
    logger.log('info','Register Person','verbose');
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
        // var context = {facultyCoordinator: facCoordName, name: req.body.fullName, institutions: req.body.institution};
        var mailObj = {
          email: req.body.email,  
          // context: context,
          // facultyCoordinator: facCoordName,
          MESSAGE: req.body.USER_MESSAGE.replace('[[facultyCoordinator]]', facCoordName),
          subject: req.body.USER_SUBJECT
        }    
        sendEmail(mailObj);
      //  welcome(mailObj)

        var facCoordEmail = "";
        people.forEach(item => {
          facCoordEmail += item.email + ',';
        });

        if(people.length > 0){
            // var context = {name: req.body.fullName, institution: req.body.institution};            
            var mailObj = {
              email: facCoordEmail,
              // institution: req.body.institution,
              cc: req.body.cc,
              // context: context
              MESSAGE: req.body.FACDEV_MESSAGE,
              subject: req.body.FACDEV_SUBJECT
            }      
            sendEmail(mailObj);                                                          
          //  newCustomer(mailObj);
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
    logger.log('info','Update Person ' + req.body._id, 'verbose');   
    if(req.body.personStatus == "02") {
      req.body.roles = ["USER"];
    }  
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, person){
      if (err) {
        return next(err);
      } else {    
        res.status(200).json(person);
      }
    })
  });

  router.put('/api/people/password/:id',  function(req, res, next){
    logger.log('info','Update Person password [%s]', req.params.id,'verbose');
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
    logger.log('info','Delete person [%s]', req.params.id,'verbose');
    Model.remove({ _id: req.params.id }, function(err, result){
      if (err) {
         return next(err);
      } else {
        res.status(200).json({msg: "Person Deleted"});
      }
    })
  });

  router.put('/api/people/sendMail', requireAuth, function(req, res, next){
    logger.log('info',"Sending email to " + req.body.id, "verbose");
    Model.findById(req.body.id).exec()
    .then(person => {
        var obj = {
          email: req.body.email,
          // type: 'generic',
          subject: req.body.subject,
          MESSAGE: req.body.message,
          name: person.name
          // context: {
          //   name: person.fullName,
          //   message: req.body.message
          // }
        };
        sendEmail(obj);

        // genericEmail(obj)

        var LogEntry = new Emaillog('info',{
          personId: req.body.id,
          email: req.body.email,
          body: req.body.message,
          from: req.body.from,
          topic: 'g',
          subject: req.body.subject
        });

        LogEntry.save();
         
        res.status(200).json({message: "Email Sent"});
        
    })
    .catch(error => {
       return next(error);
    })
  });

  router.post('/api/people/sendBulkEmail', requireAuth, function(req, res, next){
    logger.log('info','Sending bulk email', 'verbose');

    sendBulkEmails(req.body);
    res.status(201).json({message: "Emails sent"});
  });

  router.get('/api/people/count/:status', function(req, res, next){
    logger.log('info','Count people with status ' + req.params.status, 'verbose');

    Model.find({personStatus: req.params.status}, function(err, results){
      if(err) return next(err);

      res.status(200).json({count: results.length});
    });
  });

  router.post('/api/people/archive', function(req, res, next){
    logger.log('info','Archive people', 'verbose'); 
    Model.find({personStatus: '02'}, function(err, result){
      if(err){
        return next(err);
      }    
      var numPeople = result.length;
      var bulk = PersonArchive.collection.initializeOrderedBulkOp();
      var counter = 0;

      result.forEach(function(doc) {
          bulk.insert(doc);
          counter++;
      }); 
      if (counter > 0) {
          bulk.execute(function(err, result2) {
            if(err){
              return next(err);
            }         
            var bulk2 = Model.collection.initializeOrderedBulkOp();
            var counter2 = 0;        
            result.forEach(function(doc) {            
              bulk2.find( { _id: doc._id } ).remove();             
              counter2++;
            });          
            if(counter2){
              bulk2.execute(function(err, results){
                if(err){
                  res.status(500).json({message: "people not deleted"});
                }
                res.status(200).json({message: 'People Archived', number: numPeople});
              })
            }
          });
      }
    });

  });

  router.post('/api/passwordReset',  function(req, res, next){
    logger.log('info','Password Reset for ' + req.body.email, 'verbose');
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
                MESSAGE: "<H1 class='text-center' style='Margin:0;Margin-bottom:10px;color:inherit;font-family:Helvetica,Arial,sans-serif;font-size:34px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:center;word-wrap:normal'>Forgot your password?</h1><br class='text-center' style='Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:center'>It happens. Click the <a href='" + config.corsDomain + "/#/resetPassword/" + result.validationCode + "'>link</a> to reset your password.</br></p>",
                context: context
              }     

              sendEmail(mailObj);
              res.status(200).json(result);
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
    logger.log('info','Password Reset', 'verbose');  
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
    logger.log('info',"Getting weather for " + req.params.city, 'verbose')
    var city = req.params.city.split(' ').join('%20');
    return http.get({
        host: 'api.openweathermap.org',
        path: '/data/2.5/weather?zip=' + req.params.city + '&APPID=0f85bb931f8faad7e35b6f685aa4e931'
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
    logger.log('info','Getting UCC Staff', 'verbose');  
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
    logAuth.log('info','logoff-' + req.body.email, 'info');
    res.status(201).json({message: "logout successful"});
  })

  router.get('/api/notes', requireAuth,  function(req, res, next){
    logger.log('info','Get note','verbose');
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
    logger.log('info','Create Note', 'verbose');
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
    logger.log('info','Update note ' + req.body._id, 'verbose');  
    Note.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, person){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(person);
      }
    })
  });

  router.delete('/api/notes/:id', requireAuth, function(req, res, next){
    logger.log('info','Delete note ' + req.params.id,'verbose');
    Note.remove({ _id: req.params.id }, function(err, result){
      if (err) {
         return next(err);
      } else {
        res.status(200).json({msg: "Note Deleted"});
      }
    })
  });

  router.get('/api/technotes', requireAuth,  function(req, res, next){
    logger.log('info','Get technotes','verbose');
    var query = buildQuery(req.query, TechNote.find())
    .populate({ path: 'personId', model: 'Person', select: 'firstName lastName fullName'})
    .populate({ path: 'productId', model: 'Product', select: 'name'})
    .populate({ path: 'systemId', model: 'System', select: 'sid'})
    .populate({ path: 'categoryId', model: 'TechNoteCategory', select: 'category'})
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
        
  router.post('/api/technotes', requireAuth, function(req, res, next){
    logger.log('info','Create technotes', 'verbose');
    var note =  new TechNote(req.body);  
      note.save(function ( err, object ){
        if (err) {
            return next(err);
        } else {
          res.status(201).json(object);
        }
      });
  });
        
  router.put('/api/technotes', requireAuth, function(req, res, next){
    logger.log('info','Update technotes ' + req.body._id, 'verbose');  
    TechNote.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, person){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(person);
      }
    })
  });
        
  router.delete('/api/technotes/:id', requireAuth, function(req, res, next){
    logger.log('info','Delete technotes ' + req.params.id,'verbose');
    TechNote.remove({ _id: req.params.id }, function(err, result){
      if (err) {
          return next(err);
      } else {
        res.status(200).json({msg: "Note Deleted"});
      }
    })
  });

  var storageTech = multer.diskStorage({
    destination: function (req, file, cb) {

      var path = config.uploads + '/techNotes';
     
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

  var uploadTechnotes = multer({ storage: storageTech});

  router.post('/api/technotes/upload/:id',  uploadTechnotes.any(), function(req, res, next){
     logger.log('info','Upload File ', 'verbose');    
     TechNote.findById(req.params.id, function(err, techNote){   
        if(err){
          return next(err);
        } else {                   
          techNote.file =  {
              originalFilename: req.files[0].originalname,
              fileName: req.files[0].filename,
              dateUploaded: new Date()
            };                       
            techNote.save(function(err, techNote) {
              if(err){
                return next(err);
              } else {
                res.status(200).json(techNote);
              }
            });
          }        
      });
  });

  router.get('/api/technotecats', requireAuth,  function(req, res, next){
    logger.log('info','Get technotescat','verbose');
    var query = buildQuery(req.query, TechNoteCategory.find())
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
        
  router.post('/api/technotecats', requireAuth, function(req, res, next){
    logger.log('info','Create technotecats', 'verbose');
    var note =  new TechNoteCategory(req.body);  
      note.save(function ( err, object ){
        if (err) {
            return next(err);
        } else {
          res.status(201).json(object);
        }
      });
  });
        
  router.put('/api/technotecats', requireAuth, function(req, res, next){
    logger.log('info','Update technotecats ' + req.body._id, 'verbose');  
    TechNoteCategory.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, person){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(person);
      }
    })
  });
        
  router.delete('/api/technotecats/:id', requireAuth, function(req, res, next){
    logger.log('info','Delete technotecats ' + req.params.id,'verbose');
    TechNoteCategory.remove({ _id: req.params.id }, function(err, result){
      if (err) {
          return next(err);
      } else {
        res.status(200).json({msg: "Note Deleted"});
      }
    })
  });

  router.get('/api/events', requireAuth,  function(req, res, next){
    logger.log('info','Get events','verbose');
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

  router.get('/api/events/:personId', requireAuth, function(req, res, next){
    logger.log('info','Get person and ucc events', 'verbose');
    var query = Event.find()
      .where({personId: req.params.personId})
      .where({scope: "u"})
      .exec()
      .then(object => {
         if(!object || object.length === 0){          
            res.status(200).json({"message": "No Events Found"});
          } else {
            res.status(200).json(object);
          }
      })
      .catch(err => {
         res.status(500).json(err);
      })
  });

  router.post('/api/events', requireAuth, function(req, res, next){
    logger.log('info','Create Event', 'verbose');
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
    logger.log('info','Update event ' + req.body._id, 'verbose');  
    Event.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, event){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(event);
      }
    })
  });

  router.delete('/api/events/:id', requireAuth, function(req, res, next){
    logger.log('info','Delete event ' + req.params.id,'verbose');
    Event.remove({ _id: req.params.id }, function(err, result){
      if (err) {
         return next(err);
      } else {
        res.status(200).json({msg: "Event Deleted"});
      }
    })
  });

  router.get('/api/notifications', requireAuth,  function(req, res, next){
    logger.log('info','Get notifications','verbose');
    var query = buildQuery(req.query, Notifications.find())
    query.exec( function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {       
          if(!object || object.length === 0){          
            res.status(200).json({"message": "No notifications Found"});
          } else {
            res.status(200).json(object);
          }
        }
      });
  });

  router.get('/api/notifications/:personId', requireAuth, function(req, res, next){
    logger.log('info','Get person notifications', 'verbose');
    var query = buildQuery(req.query, Notifications.find())
    query
      .populate({ path: 'personId', model: 'Person', select: 'lastName firstName fullName'})
      .where({uccStaffId: req.params.personId})
      .exec()
      .then(object => {
         if(!object || object.length === 0){          
            res.status(200).json({"message": "No notifications Found"});
          } else {
            


            res.status(200).json(object);
          }
      })
      .catch(err => {
         res.status(500).json(err);
      })
  });

  router.post('/api/notifications', requireAuth, function(req, res, next){
    logger.log('info','Create notifications', 'verbose');
    var event =  new Notifications(req.body);  
      event.save(function ( err, object ){
        if (err) {
           return next(err);
        } else {
          res.status(201).json(object);
        }
      });
  });

  router.put('/api/notifications', requireAuth, function(req, res, next){
    logger.log('info','Update notifications ' + req.body._id, 'verbose');  
    Notifications.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, event){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(event);
      }
    })
  });

  router.delete('/api/notifications/:id', requireAuth, function(req, res, next){
    logger.log('info','Delete notifications ' + req.params.id,'verbose');
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
     logger.log('info','Upload File ', 'verbose');    
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
