'use strict'

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('ClientRequestAPJ'),
  ClientRequestDetail = mongoose.model('ClientRequestDetailAPJ'),
  System = mongoose.model('System'),
  Assignment = mongoose.model('Assignment'),
  System = mongoose.model('System'),
  Person = mongoose.model('Person'),
  Package = mongoose.model('Packages'),
  InvoiceData = mongoose.model('InvoiceData'),
  Invoice = mongoose.model('Invoice'),
  passport = require('passport'),
  Promise = require('bluebird'),
  logger = require('../../config/logger'),
  asyncHandler = require('express-async-handler'),
  puppeteer = require('puppeteer'),
  Promise = require('bluebird');

var requireAuth = passport.authenticate('jwt', { session: false });

var ASSIGNED_REQUEST_CODE = '2';
var CUSTOMER_ACTION_REQUEST_CODE = "4";

module.exports = function (app, config) {
  app.use('/api/apj/', router);

  router.get('/clientRequests', requireAuth, function (req, res, next) {
    logger.log('info', 'Get clientRequests');
    var query = buildQuery(req.query, Model.find());
    query.sort(req.query.order)
      .populate({ path: 'requestDetails', model: 'ClientRequestDetailAPJ' })
      .populate({ path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone ext mobile email institutionId file country' })
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No requests were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.put('/clientRequests/assign', requireAuth, function (req, res, next) {
    logger.log('info', 'Assign clientRequest ' + req.body._id);
    if (req.body._id) {
      var detailId;
      var query = Model.findById(req.body._id, function (err, clientRequest) {
        if (err) {
          return next(error);
        }
        if (clientRequest) {
          clientRequest.requestStatus = req.body.requestStatus;
          clientRequest.audit = req.body.audit;
        }
        let tasks = new Array();
        if (req.body.requestDetailsToSave) {
          req.body.requestDetailsToSave.forEach((detail, index) => {
            detailId = detail._id;
            tasks.push(ClientRequestDetail.findOneAndUpdate({ _id: detail._id }, detail, { safe: true, new: true, multi: false, upsert: true }));
          });
        }

        if (req.body.systemsToSave) {
          req.body.systemsToSave.forEach(detail => {            
            tasks.push(System.findOneAndUpdate({ _id: detail._id }, detail, { safe: true, new: true, multi: false, upsert: true }));
          });
        }

        Promise.all(tasks)
          .then(request => {
            Model.findOneAndUpdate({ _id: clientRequest._id }, { $set: clientRequest }, { safe: true, new: true, multi: false }, function (error, request) {
              if (error) {
                return next(error);
              } else {
                ClientRequestDetail.findById(detailId)
                  .select('requestStatus requiredDate createdDate requestId productId assignments.systemId assignments.client')
                  .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country' } })
                  .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
                  .populate({ path: "productId", model: "Product", select: "name" })
                  .exec()
                  .then(object => {
                    if (object) {
                      res.status(200).json(object);
                    } else {
                      res.status(404).json({ message: "No request was found" });
                    }
                  })
                  .catch(err => {
                    return next(err);
                  })
              }
            })
          })
          .catch(error => { //Promise        
            return next(error);
          })
      })
    }
  });

  router.put('/clientRequests/:id', requireAuth, function (req, res, next) {
    logger.log('info', 'Update clientRequest ' + req.body._id);

    var clientRequest = new Model(req.body);

    clientRequest.requestDetails = new Array();
    if (req.body.requestDetailsToSave) {
      var updates = req.body.requestDetailsToSave.map(detail => {
        if (detail._id) {
          if (detail.delete) {
            return {
              deleteOne: {
                filter: { _id: detail._id }
              }
            }
          } else {
            clientRequest.requestDetails.push(detail._id);
            return {
              updateOne: {
                "filter": { "_id": detail._id },
                "update": detail
              }
            }

          }
        } else {
          var obj = new ClientRequestDetail(detail);
          obj.requestId = clientRequest._id;
          clientRequest.requestDetails.push(obj._id);
          return { "insertOne": { "document": obj } }

        }
      });

      ClientRequestDetail.bulkWrite(updates, function (err, result) {
        if (err) {
          return next(error);
        }

        if (clientRequest.requestDetails.length === 0) {
          Model.findOneAndRemove({ _id: clientRequest._id }, function (err, request) {
            if (err) {
              return next(err);
            }
            res.status(200).json(request);
          });
        } else {
          Model.findOneAndUpdate({ _id: clientRequest._id }, { $set: clientRequest }, function (err, request) {
            if (err) {
              return next(err);
            }
            res.status(200).json(request);
          });
        }
      });
    }
  });

  router.put('/clientRequests', requireAuth, function (req, res, next) {
    logger.log('info', 'Update clientRequest', 'verbose');

    Model.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, request) {
      if (err) return next(err);
      var query = Model.find()
      query.sort(req.query.order)
        .populate({ path: 'requestDetails', model: 'ClientRequestDetailAPJ' })
        .populate({ path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone ext mobile email institutionId file country' })
        .exec()
        .then(object => {
          if (object) {
            res.status(200).json(object);
          } else {
            res.status(200).json({ message: "No requests were found" });
          }
        })
        .catch(err => {
          return next(err);
        })
    });

  });

  router.post('/clientRequests', requireAuth, function (req, res, next) {
    logger.log('info', 'Create clientRequest', 'verbose');

    var clientRequest = new Model(req.body);
    var tasks = new Array();

    clientRequest.requestDetails = new Array();
    req.body.requestDetails.forEach(function (detail, index) {
      var obj = new ClientRequestDetail(detail);
      obj.requestId = clientRequest._id;
      clientRequest.requestDetails.push(obj._id);
      tasks.push(ClientRequestDetail.create(obj));
    });

    Promise.all(tasks)
      .then(function (results) {
        clientRequest.save(function (err, result) {
          if (err) {
            return next(err);
          } else {
            res.status(200).json(result);
          }
        })
      })
  });

  router.get('/clientRequestsDetails', requireAuth, function (req, res, next) {
    logger.log('info', 'Get clientRequests', 'verbose');
    var query = buildQuery(req.query, ClientRequestDetail.find());
    query
      .select('requestStatus price requiredDate createdDate numberOfStudents requestId productId assignments.systemId assignments.client')
      .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country' } })
      .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
      .populate({ path: "productId", model: "Product", select: "name" })
      .exec()
      .then(object => {
        if (object) {
          object.forEach(item => {
            if (item.requestId) item.requestId.audit = [];
          });
          res.status(200).json(object);
        } else {
          res.status(404).json({ message: "No requests were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.get('/clientRequestsDetails/:id', requireAuth, function (req, res, next) {
    logger.log('info', 'Get clientRequests', 'verbose');

    ClientRequestDetail.findById(req.params.id)
      .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile email institutionId file country' } })
      .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
      .populate({ path: "productId", model: "Product", select: "name" })
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(404).json({ message: "No request was found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.put('/clientRequestsDetails', function (req, res, next) {
    logger.log('info', 'Update request detail', 'verbose');

    Model.findOneAndUpdate({ _id: req.body.requestId._id }, req.body.requestId, function (err, request) {
      if (err) return next(err);
      ClientRequestDetail.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, requestDetail) {
        if (err) return next(err);
        ClientRequestDetail.findById(requestDetail._id)
          .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile email institutionId file country' } })
          .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
          .populate({ path: "productId", model: "Product", select: "name" })
          .exec()
          .then(object => {
            if (object) {
              res.status(200).json(object);
            } else {
              res.status(404).json({ message: "No request was found" });
            }
          })
          .catch(err => {
            return next(err);
          })
      });
    });
  });

  router.get('/packages', requireAuth, function (req, res, next) {
    logger.log('info', 'Get packages');
    var query = buildQuery(req.query, Package.find());
    query.sort(req.query.order)
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No Packages were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.get('/packages/:id', requireAuth, function (req, res, next) {
    logger.log('info', 'Get packages');
    ClientRequestDetail.findById(req.params.id)
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No Packages were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.post('/packages', requireAuth, function (req, res, next) {
    logger.log('info', 'Create packages', "verbose");
    var packages = new Package(req.body);
    packages.save(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/packages', requireAuth, function (req, res, next) {
    logger.log('info', 'Update packages ' + req.body._id, 'verbose');

    Package.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/invoices', requireAuth, function (req, res, next) {
    logger.log('info', 'Get invoices');
    var query = buildQuery(req.query, Invoice.find());
    query.sort(req.query.order)
      .populate({ path: 'packageReference', model: 'InstitutionPackage' })
      .populate({ path: 'requestReference', model: 'ClientRequestDetailAPJ' })
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No invoices were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.get('/invoices/:id', requireAuth, function (req, res, next) {
    logger.log('info', 'Get invoices');
    var query = Invoice.findById(req.params.id);
    query.sort(req.query.order)
      .populate({ path: 'packageReference', model: 'InstitutionPackage' })
      .populate({ path: 'requestReference', model: 'ClientRequestDetailAPJ' })
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No invoices were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.post('/invoices', requireAuth, function (req, res, next) {
    logger.log('info', 'Create invoices', "verbose");
    var invoice = new Invoice(req.body);
    invoice.save(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/invoices', requireAuth, function (req, res, next) {
    logger.log('info', 'Update invoices ' + req.body._id, 'verbose');

    Invoice.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/invoicedata', function (req, res, next) {
    logger.log('info', 'Get invoicedata');
    var query = buildQuery(req.query, InvoiceData.find())
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No invoice data were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.post('/invoicedata', function (req, res, next) {
    logger.log('info', 'Create invioce data', "verbose");
    var invoicedata = new InvoiceData(req.body);
    invoicedata.save(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/invoicedata', function (req, res, next) {
    logger.log('info', 'Update invoices ' + req.body._id, 'verbose');

    InvoiceData.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.delete('/invoicedata/:id', function (req, res, next) {
    logger.log('info', 'Delete invoicedata ' + req.body._id, "verbose");
    InvoiceData.find({ _id: req.params.id }).remove().exec(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({ message: "invoice data deleted" });
      }
    })
  });

  // router.post('/invoices', async function(req, res, next){
  //   logger.log('info', 'Saving invoice');
  //   console.log(req.body);
  //   res.status(200).json({message: 'Invoice saved'});
  // });

  router.post('/invoices/createPDF', async function (req, res, next) {
    console.log('saving pdf')
    const fs = require('fs');
    let path = config.root + "/public/uploadedFiles/invoices/";
    var stream = fs.createWriteStream(path + 'invoice.html');
    stream.once('open', function(fd) {
      stream.write(req.body.page);
      stream.end();
    });
    let pdf = await printPDF();
    fs.writeFile(path + req.body.number + '.pdf', pdf, function (err) {
        if (err) {
          return console.log(err);
        }
      });

    res.status(200).json({ message: "done" });

  });

  router.get('/systems/product/:systems', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Getting product systems');
    var productSystems = req.params.systems.split(':');
    await System.find({ $and: [{ sid: { $in: productSystems } }, { apj: true }] })
      .populate({ path: 'clients.assignments.assignment', model: 'ClientRequestDetailAPJ' })
      .populate({ path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName' })
      .exec().then(result => {
        res.status(200).json(result);
      })
  }));

}

async function printPDF() {
  // const browser = await puppeteer.launch({ headless: true });
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
  });
  const page = await browser.newPage();
  await page.goto('http://localhost/uploadedFiles/invoices/invoice.html', { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdf
};