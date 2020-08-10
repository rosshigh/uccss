
var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
HelpTicket = mongoose.model('HelpTicket'),
HelpTicketArchive = mongoose.model('HelpTicketArchive'),
Content = mongoose.model('HelpTicketContent'),
passport = require('passport'),
HelpTicketTypes = mongoose.model('HelpTicketTypes'),
logger = require('../../config/logger'),
fs = require('fs'),
ObjectId = require('mongodb').ObjectID,
asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
app.use('/api', router);

router.get('/helpTicketsTypes', asyncHandler(async (req, res) => {
    logger.log('info', 'Get helpTicketypes Frick');
    var query = buildQuery(req.query, HelpTicketTypes.find())
    query.exec()
      .then(object => {
        res.status(200).json(object);
      })
  }));
}