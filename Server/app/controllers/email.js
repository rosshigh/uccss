var nodemailer = require('nodemailer'),
    config = require('../../config/config'),
    hbs = require('nodemailer-express-handlebars'),
    handlebars = require('express-handlebars'),
    path = require('path');

var transporter = nodemailer.createTransport('smtps://rhightower@gmail.com:Kinja1@3@smtp.gmail.com');
var viewEngine = handlebars.create({});
var options = hbs({
  viewEngine: viewEngine,
  viewPath: path.resolve(__dirname, '../views')
});
transporter.use('compile', options);

module.exports = function (app) {

  sendMail = function(mailObject){

    var mail = {
      from: 'rhightower@gmail.com',
      to: mailObject.email,
      subject: mailObject.subject,
      template: mailObject.template,
      context: mailObject.context
    };

    transporter.sendMail(mail, function (err, info) {
          if (err) {
              console.log('Error: ' + err);
          }
          else {
              console.log('Response: ' + info);
          }
      });
  }

};

