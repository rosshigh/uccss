var nodemailer = require('nodemailer'),
    config = require('../../config/config'),
    hbs = require('nodemailer-express-handlebars'),
    handlebars = require('express-handlebars'),
    passport = require('passport'),
    path = require('path'),
    logger = require('../../config/logger');

  var requireAuth = passport.authenticate('jwt', { session: false });   

var smtpConfig = {
  host: config.smtp
}   

var transporter = nodemailer.createTransport(smtpConfig);
var viewEngine = handlebars.create({});
var options = hbs({
  viewEngine: viewEngine,
  viewPath: path.resolve(__dirname, '../views')
});
transporter.use('compile', options);

module.exports = function (app) {

  sendMail = function(mailObject){
    switch(mailObject.type){
      case 'help-ticket-created':
        helpTicketCreated(mailObject);
        break;
    }

  }

};

 helpTicketCreated = function(mailObject){
    var mail = {
      from: config.emailAddress,
      to: mailObject.email,
      subject: mailObject.subject,
      template: 'help-ticket-created',
      context: mailObject.context
    };

    transporter.sendMail(mail, function (err, info) {
          if (err) {
            logger.log('Error: ' + err, 'error');
            var response = {Response: err};
            return response;
          } else {
            var response = {Response: info};
            return response;
          }
      });

 }

