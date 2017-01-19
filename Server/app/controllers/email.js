var config = require('../../config/config'),
    mongoose = require('mongoose'),
    Person = mongoose.model('Person'),
    Institution = mongoose.model('Institution'),
    logger = require('../../config/logger'),
    hbs = require('handlebars'),
    path = require('path'),
    fs = require('fs');


module.exports = function (app) {
  
    sendMail = function(mailObject){
      logger.log("sending email");
      switch(mailObject.type){
        case 'help-ticket-created':
          helpTicketCreated(mailObject);
          break;
        case 'help-ticket=updated':
          helpTicketUpdated(mailObject);
          break;
        case 'help-ticket-closed':
          helpTicketClosed(mailObject);
          break;
        case 'welcome':
          welcome(mailObject);
          break;
        case 'client-request-created':       
          requestCreated(mailObject);
          break;
        case 'client-request-updated':       
          requestUpdated(mailObject);
          break;
        case 'generic-email':       
          genericEmail(mailObject);
          break;
        case 'annual-update-contact-info':
          annualUpdateContactInfo(mailObject);
          break;

      }
    }

};

 
var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
  var sg = require('sendgrid')(config.sg_key);

  var viewPath = path.resolve(__dirname, '../views');
  var HelpTicketCreateTemplate = fs.readFileSync(viewPath + "/help-ticket-created.handlebars", 'utf-8');
  var WelcomeTemplate = fs.readFileSync(viewPath + "/welcome.handlebars", 'utf-8');
  var FacoCoWelcomeTemplate = fs.readFileSync(viewPath + "/facco-welcome.handlebars", 'utf-8');

  var HelpTicketCreateTemplateCompiled = hbs.compile(HelpTicketCreateTemplate);
  var WelcomeTemplateCompiled = hbs.compile(WelcomeTemplate);
  var FacoCoWelcomeTemplateCompiled = hbs.compile(FacoCoWelcomeTemplate);

  sendGrid = function(mailObject){
    var helper = require('sendgrid').mail;
    var from_email = new helper.Email(config.emailAddress);
    var to_email = new helper.Email(mailObject.email);
    var content = new helper.Content('text/html', mailObject.body);
    var mail = new helper.Mail(from_email, mailObject.subject, to_email, content);

    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });
    
    sg.API(request, function(error, response) {
      if(error){
        logger.log(error,'error');
      } else {
        logger.log(response);
      }
    });
  }

  welcome = function(mailObject){
    var fullName = ""; 
    var facultyCoordinator = "";
    var institution = "";
    var facultyCoordinatorEmail = "";
    var helper = require('sendgrid').mail;

    var queryP = Person.findById(mailObject.personId).exec()
    .then((person) => {         
      fullName = person ? person.fullName : "";        
      Person
        .find({ institutionId: person.institutionId, roles: {$in: ['PRIM']}  }).exec()
        .then((people) => {    
           if(people.length > 0){
             facultyCoordinator = people[0].fullName;
             facultyCoordinatorEmail = people[0].email;
           }   
           Institution.findById(person.institutionId).exec()
              .then((institution) => {       
                institution = institution ? institution.name : "";
                var faccoMsg = facultyCoordinator && institution ? "The faculy coordnator at " + institution + "  is " + facultyCoordinator + "." : "";
                var context = {fullName: fullName, facultyCoordinator: faccoMsg};   
                mailObject.body = WelcomeTemplateCompiled({fullName: fullName, facultyCoordinator: faccoMsg}); 
                mailObject.to_email = mailObject.email;
                mailObject.subject = 'UWM UCC Account Created';
                // var content = new helper.Content('text/html', body);
                // var mail = new helper.Mail(from_email, subject, to_email, content);

                sendGrid(mailObject);

                if(facultyCoordinatorEmail){               
                  var context = {fullName: fullName, facultyCoordinator: faccoMsg};   
                  mailObject.body = FacoCoWelcomeTemplateCompiled({fullName: fullName}); 
                  mailObject.to_email = facultyCoordinatorEmail;
                  mailObject.subject = 'UWM UCC Account Created';
                  // var content = new helper.Content('text/html', body);
                  // var mail = new helper.Mail(from_email, subject, to_email, content);

                  sendGrid(mailObject);
                }  
                
            })
            .catch(error => {
              logger.log(error,"error");
            })   
        })
        .catch(error => {
          logger.log(error,"error");
        })
      
    })
    .catch(error => {
      logger.log(error,"error");
    });
    

  }

  helpTicketCreated = function(mailObject){
    logger.log("Help Ticket Created email", "verbose");
    mailObject.body = HelpTicketCreateTemplateCompiled(mailObject.context);
    mailObject.to_email = mailObject.email;
    mailObject.subject = 'Help Ticket Created'; 
    sendGrid(mailObject);
  }

  helpTicketUpdated = function(mailObject){
    logger.log("Help Ticket Update email", "verbose");
    mailObject.body = HelpTicketUpdatedTemplateCompiled(mailObject.context);
    mailObject.to_email = mailObject.email;
    mailObject.subject = 'Help Ticket Updated'; 
    sendGrid(mailObject);
  }

  helpTicketClosed = function(mailObject){
    logger.log("Help Ticket Closed email", "verbose");
    mailObject.body = HelpTicketClosedTemplateCompiled(mailObject.context);
    mailObject.to_email = mailObject.email;
    mailObject.subject = 'Help Ticket Closed'; 
    sendGrid(mailObject);
  }

  requestCreated = function(mailObject){
     logger.log("Request Created email", "verbose");
      mailObject.body = "Request " + mailObject.context.clientRequestNo + " created."; 
      mailObject.to_email = mailObject.email;
      mailObject.subject = 'Product Request Created'; 
      sendGrid(mailObject);
  }

  requestUpdated = function(mailObject){
    logger.log("Request Update email", "verbose");
    mailObject.body = RequestUpdatedTemplateCompiled(mailObject.context);
    mailObject.to_email = mailObject.email;
    mailObject.subject = 'Product Request Updated'; 
    sendGrid(mailObject);
  }

  genericEmail = function(mailObject){
    logger.log("Generic email", "verbose");    
    mailObject.body = GenericTemplateCompiled(mailObject.context);
    mailObject.to_email = mailObject.email;
    mailObject.subject = 'Message from your UCC'; 
    sendGrid(mailObject);
  }

  annualUpdateContactInfo = function(mailObject){
     logger.log("Update Contact Info email", "verbose");   
  }

} else {
  var nodemailer = require('nodemailer'),
      exphbs = require('nodemailer-express-handlebars');

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

  var hbs = exphbs.create({
      layoutsDir: viewPath + "/views"
  });
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

  nodeMailerSendMail = function(mailObject){
        transporter.sendMail(mail)
        .then(info => {
            logger.log(info, 'verbose ');
            var response = {Response: info};
            return response;
        })
        .catch(error => {
            logger.log(error, 'error');
            var response = {Response: error};
            return response;
        })
      };

  helpTicketCreated = function(mailObject){
    console.log(mailObject)
      var mail = {
        from: config.emailAddress,
        to: mailObject.email,
        subject: 'Help Ticket Created',
        template: 'help-ticket-created',
        context: mailObject.context
      };

      nodeMailerSendMail(mailObject)
  }

}
