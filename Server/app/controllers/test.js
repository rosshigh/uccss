var express = require('express'),
  debug = require('debug')('tests'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('Test'),
  TestDetail = mongoose.model('TestDetail');

var Promise = require('bluebird');
//var Promise = require('../../utils/promise');

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/tests', function(req, res, next){
    debug('Get tests');
    Model.find()
      .populate('details')
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/tests/:id', function(req, res, next){
    debug('Get session [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/tests3', function(req, res, next) {
    console.log('starting')
    var test =  new Model(req.body);
    console.log(test);
    checkNewTagAndSave(req.body, test, function(err, doc){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(doc);
      }
    });
  });

  router.post('/api/tests4', function(req, res, next) {
    var test =  new Model(req.body);

    var newDetails = new Array();
    req.body.details.forEach(function(detail, index){
        newDetails.push(new TestDetail(detail));
    });

    if(newDetails.length) {
      TestDetail.create(newDetails, function (err, models) {
        if (err || !models) {
          return next(err);
        } else {
          test.details = new Array();
          models.forEach(function (model) {
            test.details.push(model._id);
          });
          test.save(function (err, testResult) {
            if (err) {
              console.log(err)
              return next(err);
            } else {
              res.status(200).json(testResult);
            }
          })
        }
      });
    }
  });

  router.post('/api/tests', function(req, res, next){
    debug('Create Session');
    var test =  new Model(req.body);
    console.log('this is body')
    console.log(req.body)
    console.log('this is test')
    console.log(test)
    console.log('details')
    console.log(test.details)
    if(req.body.details.length > 0){
      var details = req.body.details;
      console.log(details)
      test.details = new Array();
      for(var i = 0, x = details.length; i<x; i++){
        var detail = new TestDetail(details[i]);
        detail.save(function(err, detailResult){
          if (err) {
            return next(err);
          } else {
            test.details.push(detailResult._id);
            console.log('adding to details')
            console.log(test);
            console.log(detailResult)
          }
        })
      }
    }
    console.log('this is test again')
    console.log(test);
    test.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/tests', function(req, res, next){
    debug('Update Session [%s]', req.body._id);
    var test = new Model(req.body);
    var newDetails = new Array();
    var details = new Array();
    req.body.details.forEach(function(detail, index){
      var obj = new TestDetail(detail);
      //var JSObj = obj.toObject();
        details.push(obj);
    });

    var tasks = [];

    for (var i=0; i < details.length; i++) {
      tasks.push(TestDetail.findOneAndUpdate({_id: details[i]._id}, details[i], {safe:true, new:true, multi:false, upsert:true}));
    }

    Promise.all(tasks)
      .then(function(results) {
        test.details = new Array();
        results.forEach(function(record){
          test.details.push(record._id);
        })
        Model.findOneAndUpdate({_id: test._id}, {$set:test}, {safe:true, multi:false}, function(err, testResult){
            if(err) {
              return next(err);
            } else {
              console.log(test)
              res.status(200).json(test);
            }
          });
      }, function (err) {
        console.log(err);
      })

  });

  router.delete('/api/tests/:id', function(req, res, next){
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

function save(records, Model, callback){
  var ids = new Array();
  records.forEach(function(record){
    Model.findOneAndUpdate({_id: record._id}, record, {safe:true, multi:false, upsert:true}, function(err, result){
      if (err) {
        res.status(500).json(err);
      } else {
        ids.push(result._id);
      }
    })
  })
}

//function save(records, Model, match){
//  match = match || 'id';
//  return new Promise(function(resolve, reject){
//    var bulk = Model.collection.initializeUnorderedBulkOp();
//    records.forEach(function(record){
//      var query = {};
//      query[match] = record[match];
//      bulk.find(query).upsert().updateOne( record );
//    });
//    bulk.execute(function(err, bulkres){
//      if (err) return reject(err);
//      resolve(bulkres);
//    });
//  });
//}


var checkNewTagAndSave = function(data, doc, next){ // data = req.body (your input json), doc = mongoose document to be saved, next is the callback
  console.log('starting')
  console.log(doc)
  var updateNow = function(toSave, newTags, doc){
    // save your mongoose doc and call the callback.
console.log('inside updateNow')
console.log(toSave)
console.log(doc)
    doc.set(toSave);
    doc.save(next);
  };
  //var data = req.body;
  var detailsToCreate = [];
  var detailids = [];
  data.details.forEach(function(detail, index){
    if(detail._id) {
      detailids.push(detail._id);
    } else {
      detailsToCreate.push(detail);
    }
  });
  data.details = detailids;
console.log('doc')
console.log(doc)
  if(detailsToCreate.length === 0) updateNow(data,detailids,doc);
  else {
    mongoose.model('TestDetail').create(detailsToCreate, function(err, models){
      if(err || !models) return next(err);
      else {
        models.forEach(function(model){
          data.details.push(model._id);
        });
        updateNow(data, models);
      }
    });
  }
};
