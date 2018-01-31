// var config = require('../../config/config'),
var    mongoose = require('mongoose'),
      Promise = require('bluebird'),
      Person = mongoose.model('Person'),
      Institution = mongoose.model('Institution'),
      logger = require('../../config/logger'),
      hbs = require('handlebars'),
      path = require('path'),
      fs = require('fs'),
      EmailLog = mongoose.model('EmailLog'),
      emailConfig = require('../../config/email-config');

    // var env = 'production';

module.exports = function (app) {
  


};

 
var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
  var sg = require('sendgrid')(emailConfig.sg_key);

  var viewPath = path.resolve(__dirname, '../views');
  var WelcomeTemplate = fs.readFileSync(viewPath + "/welcome.handlebars", 'utf-8');
  var FacoCoWelcomeTemplate = fs.readFileSync(viewPath + "/facco-welcome.handlebars", 'utf-8');
  var CustomerActionTemplate = fs.readFileSync(viewPath + "/client-request-customer-action.handlebars", "utf-8");
  var GenericTemplate = fs.readFileSync(viewPath + "/generic.handlebars", "utf-8");
  var HelpTicketCreateTemplate = fs.readFileSync(viewPath + "/help-ticket-created.handlebars", 'utf-8');
  var HelpTicketCreateStaffTemplate = fs.readFileSync(viewPath + "/help-ticket-staff-created.handlebars", 'utf-8');
  var HelpTicketUpdatedTemplate = fs.readFileSync(viewPath + "/help-ticket-updated.handlebars", "utf-8");
  var HelpTicketStaffClosedTemplate = fs.readFileSync(viewPath + "/help-ticket-staff-closed.handlebars", "utf-8");
  var HelpTicketClosedTemplate = fs.readFileSync(viewPath + "/help-ticket-closed.handlebars", "utf-8");
  var RequestUpdatedTemplate = fs.readFileSync(viewPath + "/client-request-updated.handlebars", "utf-8");
  var PasswordResetTemplate = fs.readFileSync(viewPath + "/password-reset.handlebars", "utf-8");
  var RequestCreatedTemplate = fs.readFileSync(viewPath + "/client-request-created.handlebars", "utf-8");
  var NewCustomerStaffTemplate = fs.readFileSync(viewPath + "/new-customer.handlebars", "utf-8");
  var ActivateTemplate = fs.readFileSync(viewPath + "/activate-customer.handlebars", "utf-8");
  var emailTemplate = fs.readFileSync(viewPath + "/email-template.handlebars", "utf-8");

  var HelpTicketCreateTemplateCompiled = hbs.compile(HelpTicketCreateTemplate);
  var HelpTicketCreateStaffTemplateCompiled = hbs.compile(HelpTicketCreateStaffTemplate);
  var HelpTicketStaffClosedTemplateCompiled = hbs.compile(HelpTicketStaffClosedTemplate);
  var WelcomeTemplateCompiled = hbs.compile(WelcomeTemplate);
  var FacoCoWelcomeTemplateCompiled = hbs.compile(FacoCoWelcomeTemplate);
  var CustomerActionTemplateCompiled = hbs.compile(CustomerActionTemplate);
  var GenericTemplateCompiled = hbs.compile(GenericTemplate);
  var HelpTicketUpdatedTemplateCompiled = hbs.compile(HelpTicketUpdatedTemplate); 
  var RequestUpdatedTemplateCompiled = hbs.compile(RequestUpdatedTemplate);
  var PasswordResetTemplateCompiled = hbs.compile(PasswordResetTemplate);
  var HelpTicketClosedTemplateCompiled = hbs.compile(HelpTicketClosedTemplate);
  var RequestCreatedTemplateCompiled = hbs.compile(RequestCreatedTemplate); 
  var NewCustomerStaffTemplateCompiled = hbs.compile(NewCustomerStaffTemplate);
  var ActivateTemplateCompiled = hbs.compile(ActivateTemplate);
  var emailTemplateCompiled = hbs.compile(emailTemplate);

  sendGrid = function(mailObject){
    mailObject.body = mailObject.body.split('&lt;').join('<').split('&gt;').join('>'); 
    if(mailObject.email){
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email(emailConfig.emailAddress);
        var to_email = new helper.Email(mailObject.email);
        var content = new helper.Content('text/html', mailObject.body);

        var mail = new helper.Mail(from_email, mailObject.subject, to_email, content);
        
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        });

        sg.API(request)
          .then(response => {
              logger.log(response, "verbose");
              var emailLog = new EmailLog({
                email: mailObject.email,
                subject: mailObject.subject,
                body: JSON.stringify(mailObject.context),
                from: mailObject.from,
                topic: mailObject.topic ? mailObject.topic : ""
              })
              emailLog.save();
          })
          .catch(error => {
              logger.log(error, "verbose");
          });
    }
  }

  // welcome = function(mailObject){
  //   logger.log("Welcome email", "verbose");    
  //   mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
  //   mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
  //   mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
  //   mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
  //   mailObject.context.WELCOME_MESSAGE = emailConfig.WELCOME_MESSAGE;

  //   mailObject.body = WelcomeTemplateCompiled(mailObject.context);
  //   mailObject.email = mailObject.email;
  //   mailObject.subject = 'UCCSS Account Created';
  //   sendGrid(mailObject);
  // }

  newCustomerActivate = function(mailObject){
    logger.log("Activate email", "verbose");    
    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
    mailObject.context.ACTIVATE_MESSAGE = emailConfig.ACTIVATE_MESSAGE;

    mailObject.body = ActivateTemplateCompiled(mailObject.context);
    mailObject.email = mailObject.email;
    mailObject.subject = 'UCCSS Account Activated';
    sendGrid(mailObject);
  }

  sendEmail = function(mailObject){
    logger.log("Email Sent", "verbose");
    var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
    mailObject.logoExists = emailConfig.UCC_LOGO != "";
    // mailObject.context = {};
    mailObject.HOST = emailConfig.HOST;
    mailObject.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.UNIVERSITY_NAME = emailConfig.UNIVERSITY_NAME;
    mailObject.UCCSS_NAME = emailConfig.UCCSS_NAME;
    mailObject.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.UA_LOGO = emailConfig.UA_LOGO;
    mailObject.UNIVERSITY_LOGO = emailConfig.UNIVERSITY_LOGO;
    mailObject.MESSAGE = mailObject.MESSAGE;
    mailObject.INSTRUCTIONS = mailObject.INSTRUCTIONS;

    mailObject.template='email-template'

    mailObject.body = emailTemplateCompiled(mailObject);
    mailObject.email = mailObject.email;
    mailObject.subject = mailObject.subject;      
  console.log(mailObject)
    // sendGrid(mailObject)
  }

  // helpTicketCreated = function(mailObject){
  //   logger.log("Help Ticket Created email", "verbose");
  //   mailObject.context.logoExists = emailConfig.UCC_LOGO != "";
   
  //   var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
  //   // mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
  //   mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
  //   mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
  //   // mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME; 

  //   mailObject.context.UNIVERSITY_NAME = emailConfig.UNIVERSITY_NAME;
  //   mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
  //   mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
  //   mailObject.context.UA_LOGO = emailConfig.UA_LOGO;
  //   mailObject.context.UNIVERSITY_LOGO = emailConfig.UNIVERSITY_LOGO;
  //   mailObject.context.INSTRUCTIONS = emailConfig.HELP_TICKET_INSTRUCTIONS.replace('[[HOST]]', emailConfig.HOST);

  //   // mailObject.body = HelpTicketCreateTemplateCompiled(mailObject.context);
  //   mailObject.body = emailTemplateCompiled(mailObject.context);
  //   mailObject.email = mailObject.email;
  //   mailObject.subject = 'Help Ticket Created';      
  //   sendGrid(mailObject)

  //   if(mailObject.cc) {       
  //     mailObject.body = HelpTicketCreateStaffTemplateCompiled(mailObject.context);
  //     mailObject.email = mailObject.cc;      
  //     sendGrid(mailObject)
  //   }
  // }

  // helpTicketUpdated = function(mailObject){
  //   logger.log("Help Ticket Update email", "verbose");
  //    var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
  //     mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
  //     mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
  //     mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
  //     mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;

  //     mailObject.body = HelpTicketUpdatedTemplateCompiled(mailObject.context);
  //     mailObject.email = mailObject.email;
  //     mailObject.subject = 'Help Ticket Updated'; 
  //     sendGrid(mailObject)

  //     if(mailObject.cc) {     
  //       mailObject.email = mailObject.cc;      
  //       sendGrid(mailObject)
  //     }
  // }

  // helpTicketClosed = function(mailObject){
  //   logger.log("Help Ticket Closed email", "verbose");

  //   var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
  //   mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
  //   mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
  //   mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
  //   mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;

  //   mailObject.body = HelpTicketClosedTemplateCompiled(mailObject.context);
  //   mailObject.to_email = mailObject.email;
  //   mailObject.subject = 'Help Ticket Closed'; 
  //   sendGrid(mailObject)

  //   if(mailObject.cc) {   
  //     mailObject.body = HelpTicketStaffClosedTemplateCompiled(mailObject.context);    
  //     mailObject.email = mailObject.cc;      
  //     sendGrid(mailObject)
  //   }

  // }

  newCustomer = function(mailObject){
    logger.log("Fac Dev new account email", "verbose");

    var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;

    mailObject.body = NewCustomerStaffTemplateCompiled(mailObject.context);
    mailObject.email = mailObject.email;
    mailObject.subject = 'New UCCSS account created'; 
    sendGrid(mailObject)

    if(mailObject.cc) {   
      mailObject.body = NewCustomerStaffTemplateCompiled(mailObject.context);    
      mailObject.email = mailObject.cc;      
      sendGrid(mailObject)
    }
  }

  requestCreated = function(mailObject){
     logger.log("Request Created email", "verbose");
      var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
      mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
      mailObject.context.CREATE_REQUEST_WHATS_NEXT = emailConfig.CREATE_REQUEST_WHATS_NEXT;
      mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
      mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
      mailObject.body = RequestCreatedTemplateCompiled(mailObject.context);
      mailObject.to_email = mailObject.email;
      mailObject.subject = 'Product Request Created'; 

      sendGrid(mailObject)
  }

  requestUpdated = function(mailObject){
    logger.log("Request Update email", "verbose");
    var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
      mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
      mailObject.context.CREATE_REQUEST_WHATS_NEXT = emailConfig.CREATE_REQUEST_WHATS_NEXT;
      mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
      mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
      
      mailObject.to_email = mailObject.email;mailObject.body = RequestUpdatedTemplateCompiled(mailObject.context);
      mailObject.subject = 'Product Request Updated'; 
       sendGrid(mailObject)
  }

  customerAction = function(mailObject){
    logger.log("Customer Action email", "verbose");
    var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.body = CustomerActionTemplateCompiled(mailObject.context);
    mailObject.context.topMessage = "We need some additional information in order to fulfill your request"
    // var mail = {
    //     from: emailConfig.emailAddress,
    //     to: mailObject.email,
    //     subject: 'Customer Action Required',
    //     template: 'client-request-customer-action',
    //     context: mailObject.context
    // };
      sendGrid(mailObject)
  }

  genericEmail = function(mailObject){
    logger.log("Generic email", "verbose");    
      mailObject.body = GenericTemplateCompiled(mailObject.context);
      mailObject.to_email = mailObject.email;
      mailObject.subject = mailObject.subject; 
      sendGrid(mailObject)
  }

  annualUpdateContactInfo = function(mailObject){
     logger.log("Update Contact Info email", "verbose");   
  }

  passwordReset = function(mailObject){
    logger.log("Password reset request", "verbose");    
      mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
      mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
      mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
      mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;  
      mailObject.body = PasswordResetTemplateCompiled(mailObject.context);
      mailObject.to_email = mailObject.email;
      mailObject.subject = mailObject.subject;    
      sendGrid(mailObject)
  }

  sendBulkEmails = function(mailObject){
    
    logger.log("Email Sent", "verbose");
    // var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
       
  console.log(mailObject)
  mailObject.context = {};
  mailObject.context.logoExists = emailConfig.UCC_LOGO != "";
  mailObject.context.HOST = emailConfig.HOST;
  mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
  mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
  mailObject.context.UNIVERSITY_NAME = emailConfig.UNIVERSITY_NAME;
  mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
  mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
  mailObject.context.UA_LOGO = emailConfig.UA_LOGO;
  mailObject.context.UNIVERSITY_LOGO = emailConfig.UNIVERSITY_LOGO;
console.log(mailObject.email.MESSAGE)  
  mailObject.context.MESSAGE = mailObject.email.MESSAGE;
  mailObject.context.subject = mailObject.email.subject;  
  mailObject.context.INSTRUCTIONS = mailObject.email.INSTRUCTIONS;
  mailObject.from = emailConfig.emailAddress;
  mailObject.template='email-template'
  mailObject.recipients.forEach(item => { 
    mailObject.to = mailObject.email; 
     
      // mailObject.body = emailTemplateCompiled(mailObject);
      // mailObject.email = mailObject.email;
      

      // var mail = {
      //   from: emailConfig.emailAddress,
      //   to: item.email,
      //   subject: mailObject.email.subject,
      //   template: "generic",
      //   context: { name: item.name, message: mailObject.email.emailMessage, UCC_PHONE: emailConfig.UCC_PHONE, UCC_EMAIL: emailConfig.UCC_EMAIL}
      // }
      // nodeMailerSendMail(mailObject); 
      console.log(mailObject)
    });
    mailObject.to = emailConfig.emailAddress;
    //  var mail = {
    //     from: emailConfig.emailAddress,
    //     to: emailConfig.emailAddress,
    //     subject: mailObject.email.subject,
    //     template: "generic",
    //     context: { name: "UCC", message: mailObject.email.emailMessage, UCC_PHONE: emailConfig.UCC_PHONE, UCC_EMAIL: emailConfig.UCC_EMAIL}
    //   }
      // nodeMailerSendMail(mailObject);   
      console.log(mailObject)

  }

} else {
   var  nodemailer = require('nodemailer'),
        handlebars = require('express-handlebars'),
        exphbs = require('nodemailer-express-handlebars');

  var smtpConfig = {
    host: emailConfig.smtp,
    pool: true
  }   

  var transporter = nodemailer.createTransport(smtpConfig);
  var viewEngine = handlebars.create({});
  var options = exphbs({
    viewEngine: viewEngine,
    viewPath: path.resolve(__dirname, '../views')
  });
  transporter.use('compile', options);

  nodeMailerSendMail = function(mailObject){     
        transporter.sendMail(mailObject)
        .then(result => {       
            var emailLog = new EmailLog({
              email: mailObject.to,
              subject: mailObject.subject,
              body: JSON.stringify(mailObject),
              from: mailObject.from,
              topic: mailObject.topic ? mailObject.topic : ""
            });
            emailLog.save();
            logger.log(result, 'verbose ');
        })
        .catch(error => {         
            logger.log(error, 'error');
        })
  };

  sendEmail = function(mailObject){
    logger.log("Email Sent", "verbose");
    var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
    mailObject.context = {};
    mailObject.context.logoExists = emailConfig.UCC_LOGO != "";
    mailObject.context.HOST = emailConfig.HOST;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.context.UNIVERSITY_NAME = emailConfig.UNIVERSITY_NAME;
    mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UA_LOGO = emailConfig.UA_LOGO;
    mailObject.context.UNIVERSITY_LOGO = emailConfig.UNIVERSITY_LOGO;


    mailObject.context.MESSAGE = mailObject.MESSAGE;
    mailObject.context.INSTRUCTIONS = mailObject.INSTRUCTIONS;

    mailObject.to = mailObject.email;
    mailObject.subject = mailObject.subject;   
    mailObject.from = emailConfig.emailAddress;
    mailObject.template = 'email-template';

    nodeMailerSendMail(mailObject);
  }

  welcome = function(mailObject){
    logger.log("Welcome to the UCCSS email", 'verbose');
    
    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
    mailObject.context.WELCOME_MESSAGE = emailConfig.WELCOME_MESSAGE;

    var mail = {
        from: emailConfig.emailAddress,
        to: mailObject.email,
        subject: 'UWM UCC Account Created',
        template: 'welcome',
        context: mailObject.context,
        topic: "welcome"
      };

    nodeMailerSendMail(mail);
  }

  newCustomerActivate = function(mailObject){
    logger.log("Activate email", "verbose");    
    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
    mailObject.context.ACTIVATE_MESSAGE = emailConfig.ACTIVATE_MESSAGE;

    var mail = {
        from: emailConfig.emailAddress,
        to: mailObject.email,
        subject: 'UCCSS Account Activated',
        template: 'activate-customer',
        context: mailObject.context,
        topic: "newCustomerActivate"
    };
     nodeMailerSendMail(mail); 
  }

  newCustomer = function(mailObject){
    logger.log("Fac Dev new account email", "verbose");

    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;

    var mail = {
        from: emailConfig.emailAddress,
        to: mailObject.email,
        cc: mailObject.cc,
        subject: 'UCCSS account created',
        template: 'new-customer',
        context: mailObject.context,
        topic: "newCustomer"
    };
     nodeMailerSendMail(mail);
  }

  // helpTicketCreated = function(mailObject){
  //     logger.log("Help Ticket Created email", "verbose");

  //     mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
  //     mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
  //     mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
  //     mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
  //     var mail = {
  //       from: emailConfig.emailAddress,
  //       to: mailObject.email,
  //       cc: mailObject.cc,
  //       subject: 'Help Ticket Created',
  //       template: 'help-ticket-created',
  //       context: mailObject.context,
  //       topic: "helpTicketCreated"
  //     };

  //     nodeMailerSendMail(mail)  

  // }

  // helpTicketUpdated = function(mailObject){
  //     logger.log("Help Ticket Update email", "verbose");
      
  //     mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
  //     mailObject.context.HOST = emailConfig.HOST;
  //     mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
  //     mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
  //     mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
  //     var mail = {
  //         from: emailConfig.emailAddress,
  //         to: mailObject.email,
  //         cc: mailObject.cc,
  //         subject: 'Help Ticket Updated',
  //         template: 'help-ticket-updated',
  //         context: mailObject.context,
  //         topic: "helpTicketUpdated"
  //     };

  //     nodeMailerSendMail(mail);
  // }

  // helpTicketClosed = function(mailObject){
  //   logger.log("Help Ticket Closed email", "verbose");
    
  //   mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
  //   mailObject.context.HOST = emailConfig.HOST;
  //   mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
  //   mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
  //   mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
  //    var mail = {
  //         from: emailConfig.emailAddress,
  //         to: mailObject.email,
  //         cc: mailObject.cc,
  //         subject: 'Help Ticket Closed',
  //         template: 'help-ticket-closed',
  //         context: mailObject.context,
  //         topic: "helpTicketClosed"
  //     };

  //     nodeMailerSendMail(mail); 
  // }

  requestCreated = function(mailObject){
     logger.log("Request Created email", "verbose");
      
      mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
      mailObject.context.CREATE_REQUEST_WHATS_NEXT = emailConfig.CREATE_REQUEST_WHATS_NEXT;
      mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
      mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
      var mail = {
            from: emailConfig.emailAddress,
            to:  mailObject.email,
            cc: mailObject.cc,
            subject: 'Product Request Created',
            template: 'client-request-created',
            context: mailObject.context,
            topic: "requestCreated"
        };

        nodeMailerSendMail(mail) 
  }

  requestUpdated = function(mailObject){
    logger.log("Request Update email", "verbose");
     
      mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
      mailObject.context.ASSIGN_REQUEST = emailConfig.ASSIGN_REQUEST;
      mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
      mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
      mailObject.context.topMessage = "Your client for the following product request has been updated"
      var mail = {
          from: emailConfig.emailAddress,
          to: mailObject.email,
          // cc: mailObject.cc,
          subject: 'Product Request Updated',
          template: 'client-request-updated',
          context: mailObject.context,
          topic: "requestUpdated"
      };

      nodeMailerSendMail(mail)   
  }

  customerAction = function(mailObject){
    logger.log("Customer Action email", "verbose");
    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.context.topMessage = "We need some additional information in order to fulfill your request"
    var mail = {
        from: emailConfig.emailAddress,
        to: mailObject.email,
        subject: 'Customer Action Required',
        template: 'client-request-customer-action',
        context: mailObject.context,
        topic: "customerAction"
    };

    nodeMailerSendMail(mail)
  }

  genericEmail = function(mailObject){
    logger.log("Generic email", "verbose");  
    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.context.topMessage = "A message from the UCC"
    var mail = {
        from: emailConfig.emailAddress,
        to: mailObject.email,
        subject: mailObject.subject,
        template: 'generic',
        context: mailObject.context,
        topic: "genericEmail"
    };
    nodeMailerSendMail(mail)    
  }

  annualUpdateContactInfo = function(mailObject){
     logger.log("Update Contact Info email", "verbose");    
  }

  passwordReset = function(mailObject){
    logger.log("Password reset request", "verbose"); 
      mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
      mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
      mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
      mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
    
      var mail = {
          from: emailConfig.emailAddress,
          to: mailObject.email,
          subject: mailObject.subject,
          template: 'password-reset',
          context: mailObject.context,
          topic: "passwordReset"
      };
        console.log(mail);  
      nodeMailerSendMail(mail)   
  }

  sendBulkEmails = function(mailObject){
    logger.log("Email Sent", "verbose");
    mailObject.context = {};
    mailObject.context.logoExists = emailConfig.UCC_LOGO != "";
    mailObject.context.HOST = emailConfig.HOST;
    mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
    mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
    mailObject.context.UNIVERSITY_NAME = emailConfig.UNIVERSITY_NAME;
    mailObject.context.UCCSS_NAME = emailConfig.UCCSS_NAME;
    mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
    mailObject.context.UA_LOGO = emailConfig.UA_LOGO;
    mailObject.context.UNIVERSITY_LOGO = emailConfig.UNIVERSITY_LOGO;
    mailObject.context.MESSAGE = mailObject.MESSAGE;
    mailObject.context.subject = mailObject.subject;  
    mailObject.context.INSTRUCTIONS = mailObject.INSTRUCTIONS;
    mailObject.from = emailConfig.emailAddress;
    mailObject.template='email-template'
    mailObject.recipients.forEach(item => { 
      mailObject.to = mailObject.email; 
      nodeMailerSendMail(mailObject); 
    });
    mailObject.to = emailConfig.emailAddress;
    nodeMailerSendMail(mailObject);  
  }

  test = function(mailObj){
    var mail = {
        from: 'ucc@uwm.edu',
        to: mailObj.email,
        cc:  mailObj.cc,
        subject: 'subject',
        template: "generic",
        context: { name: 'name', message: 'message'}
      }
      console.log(mail);
      nodeMailerSendMail(mail);
  }

}
