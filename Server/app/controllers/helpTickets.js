var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('HelpTicket')
  Content = mongoose.model('HelpTicketContent');

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/helpTickets', function(req, res, next){
    debug('Get helpTicket');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/helpTickets/current', function(req, res, next){
    debug('Get helpTicket');
    Model.find( { $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/helpTickets/current/count', function(req, res, next){
    debug('Get helpTicket');
    //var query = buildQuery(req.query, Model.find({ $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]}))
    //query.exec(function(err, object){
    Model.find( { $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]})
      .sort(req.query.order)
      .exec(function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/helpTickets/current/count/:personId', function(req, res, next){
    debug('Get helpTicket');
    Model.find( { 'personId': req.params.personId, $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/helpTickets/count', function(req, res, next){
    debug('Get helpTicket');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
      if (err) {
          return next(err);
        } else {
          res.status(200).json({count: object.length});
        }
      });
  });

  router.get('/api/helpTickets/:id', function(req, res, next){
    debug('Get help ticket [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/helpTickets', function(req, res, next){
    debug('Create HelpTicket');
    var helpTicket =  new Model(req.body);
    helpTicket.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/helpTickets/content/:id', function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    Model.findById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        var content = new Content(req.body);
        result.content.push(content);
        result.save(function(err, result){
          if (err) {
            return next(err);
          } else {
            res.status(200).json(content);
          }
        })
      }
    })
  });

  router.put('/api/helpTickets/owner/:id', function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    Model.findById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        if(req.body.personId != result.owner[0].personId){
          result.owner.unshift({
            personId: req.body.personId,
            dateAssigned: new Date()
          });
          result.save(function(err, result){
            if (err) {
              return next(err);
            } else {
              res.status(200).json(result);
            }
          })
        } else {
          res.status(200).json(result);
        }
      }
    })
  });

  router.put('/api/helpTickets/status/:id', function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    Model.findById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        result.helpTicketStatus = req.body.helpTicketStatus;
        result.save(function(err, result){
          if (err) {
            return next(err);
          } else {
            res.status(200).json(result);
          }
        })
      }
    })
  });

  router.put('/api/helpTickets/keywords/:id', function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    Model.findById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        result.keyWords = req.body.keyWords;
        result.save(function(err, result){
          if (err) {
            return next(err);
          } else {
            res.status(200).json(result);
          }
        })
      }
    })
  });

  router.put('/api/helpTickets', function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.put('/api/helpTickets/sendMail/:id', function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    if(req.body.audit){
      Model.findById(req.params.id, function(err, result){
        if (err) {
          return next(err);
        } else {
          result.audit.push(req.body.audit);
          result.save(function(err, result){
            if (err) {
              return next(err);
            } else {
              var obj = {
                subject: 'Help Ticket Updated',
                email: req.body.toEmail,
                template: 'help-ticket-response',
                context: {
                  customerMessage: req.body.customerMessage
                }
              };
              sendMail(obj);
              res.status(200).json(content);
            }
          })
        }
      })
    }
  });

  router.delete('/api/helpTickets/:id', function(req, res, next){
    debug('Delete session [%s]', req.params.id);
    Model.removeById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json(result);
      }
    })
  });
};
