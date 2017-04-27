var  nodemailer = require('nodemailer'),
        handlebars = require('express-handlebars'),
        exphbs = require('nodemailer-express-handlebars');

  var smtpConfig = {
    host: silk.csuchico.edu 
  }   

  var transporter = nodemailer.createTransport(smtpConfig);

  nodeMailerSendMail = function(mailObject){     
        transporter.sendMail(mailObject)
        .then(result => {       
            console.log(result);
        })
        .catch(error => {         
            console.log(error);
        })
  };

  nodeMailerSendMail({
          from: sap@csuchico.edu,
          to: hightowe@uwm.edu,
          subject: 'testing'
        });