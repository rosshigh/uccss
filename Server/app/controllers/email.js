var config = require('../../config/config'),
    mongoose = require('mongoose'),
    Promise = require('bluebird'),
    Person = mongoose.model('Person'),
    Institution = mongoose.model('Institution'),
    logger = require('../../config/logger'),
    hbs = require('handlebars'),
    path = require('path'),
    fs = require('fs'),
    emailConfig = require('../../config/email-config');

module.exports = function (app) {
  
    // sendMail = function(mailObject){
    //   logger.log("sending email");
    //   switch(mailObject.type){
    //     case 'help-ticket-created':
    //       helpTicketCreated(mailObject);
    //       break;
    //     case 'help-ticket=updated':
    //       helpTicketUpdated(mailObject);
    //       break;
    //     case 'help-ticket-closed':
    //       helpTicketClosed(mailObject);
    //       break;
    //     case 'welcome':
    //       welcome(mailObject);
    //       break;
    //     case 'client-request-created':       
    //       requestCreated(mailObject);
    //       break;
    //     case 'client-request-updated':       
    //       requestUpdated(mailObject);
    //       break;
    //     case 'generic':       
    //       genericEmail(mailObject);
    //       break;
    //     case 'annual-update-contact-info':
    //       annualUpdateContactInfo(mailObject);
    //       break;
    //     case 'client-request-customer-action':        
    //       customerAction(mailObject);
    //       break;
    //   }
    // }

};

 
var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
  var sg = require('sendgrid')(config.sg_key);

  var viewPath = path.resolve(__dirname, '../views');
  var HelpTicketCreateTemplate = fs.readFileSync(viewPath + "/help-ticket-created.handlebars", 'utf-8');
  var WelcomeTemplate = fs.readFileSync(viewPath + "/welcome.handlebars", 'utf-8');
  var FacoCoWelcomeTemplate = fs.readFileSync(viewPath + "/facco-welcome.handlebars", 'utf-8');
  var CustomerActionTemplate = fs.readFileSync(viewPath + "/client-request-customer-action.handlebars", "utf-8");
  var GenericTemplate = fs.readFileSync(viewPath + "/generic.handlebars", "utf-8");
  var HelpTicketUpdatedTemplate = fs.readFileSync(viewPath + "/help-ticket-updated.handlebars", "utf-8");
  var HelpTicketClosedTemplate = fs.readFileSync(viewPath + "/help-ticket-closed.handlebars", "utf-8");
  var RequestUpdatedTemplate = fs.readFileSync(viewPath + "/client-request-updated.handlebars", "utf-8");
  var PasswordResetTemplate = fs.readFileSync(viewPath + "/password-reset.handlebars", "utf-8");
  var RequestCreatedTemplate = fs.readFileSync(viewPath + "/client-request-created.handlebars", "utf-8");

  var HelpTicketCreateTemplateCompiled = hbs.compile(HelpTicketCreateTemplate);
  var WelcomeTemplateCompiled = hbs.compile(WelcomeTemplate);
  var FacoCoWelcomeTemplateCompiled = hbs.compile(FacoCoWelcomeTemplate);
  var CustomerActionTemplateCompiled = hbs.compile(CustomerActionTemplate);
  var GenericTemplateCompiled = hbs.compile(GenericTemplate);
  var HelpTicketUpdatedTemplateCompiled = hbs.compile(HelpTicketUpdatedTemplate); 
  var RequestUpdatedTemplateCompiled = hbs.compile(RequestUpdatedTemplate);
  var PasswordResetTemplateCompiled = hbs.compile(PasswordResetTemplate);
  var HelpTicketClosedTemplateCompiled = hbs.compile(HelpTicketClosedTemplate);
   var RequestCreatedTemplateCompiled = hbs.compile(RequestCreatedTemplate);

  sendGrid = function(mailObject){
    mailObject.body = mailObject.body.split('&lt;').join('<').split('&gt;').join('>'); 
    if(mailObject.email){
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email(config.emailAddress);
        var to_email = new helper.Email(mailObject.email);
        var content = new helper.Content('text/html', mailObject.body);

        var mail = new helper.Mail(from_email, mailObject.subject, to_email, content);

        if(mailObject.cc && mailObject.cc.length > 0){
          var ccArray = mailObject.cc.split(';');
          if(ccArray && ccArray.length > 0){
            var personalization = new helper.Personalization()
            ccArray.forEach(item => {
console.log(item)              
              personalization.addCc(new helper.Email(item));
            })
          }
          mail.addPersonalization(personalization);
console.log(mail.personalizations)          
        }

        
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        });

        sg.API(request)
          .then(response => {
              logger.log(response, "verbose");
          })
          .catch(error => {
              logger.log(error, "verbose");
          });
    }
  }

  welcome = function(mailObject){
    logger.log("Welcome email", "verbose");    
    return new Promise(function(resolve, reject) {
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
                  mailObject.email = mailObject.email;
                  mailObject.subject = 'UWM UCC Account Created';


                    sendGrid(mailObject)
                      .then(result => {                      
                        if(facultyCoordinatorEmail){               
                          mailObject.body = FacoCoWelcomeTemplateCompiled({fullName: fullName}); 
                          mailObject.email = facultyCoordinatorEmail;
                          mailObject.subject = 'UWM UCC Account Created';

                          sendGrid(mailObject)
                            .then(result => {                            
                              if (result.statusCode === 202) {     
                                  resolve(result);
                                } else {
                                  reject(Error(result));
                                }
                            })
                            .catch(error => {
                              reject(Error(result));
                            })
                        }  
                      })
                      .catch(error => {
                        reject(Error(result));
                      })
              })
              .catch(error => {
                logger.log(error,"error");
                reject(Error(error));
              })   
          })
          .catch(error => {
            logger.log(error,"error");
            reject(Error(error));
          })
        
      })
      .catch(error => {
        logger.log(error,"error");
      });
    
    });
  }

  helpTicketCreated = function(mailObject){
    logger.log("Help Ticket Created email", "verbose");
    // return new Promise(function(resolve, reject) {
      mailObject.body = HelpTicketCreateTemplateCompiled(mailObject.context);
      mailObject.email = mailObject.email;
      mailObject.subject = 'Help Ticket Created';      
      sendGrid(mailObject)
      // .then(result => {
      //         if (result.statusCode === 202) {     
      //           resolve(result);
      //         } else {
      //           reject(Error(result));
      //         }
      //     })
    // });
  }

  helpTicketUpdated = function(mailObject){
    logger.log("Help Ticket Update email", "verbose");
    //  return new Promise(function(resolve, reject) {
      mailObject.body = HelpTicketUpdatedTemplateCompiled(mailObject.context);
      mailObject.email = mailObject.email;
      mailObject.subject = 'Help Ticket Updated'; 
      sendGrid(mailObject)
      // .then(result => {
                // if (result.statusCode === 202) {     
                  // resolve(result);
                // } else {
                  // reject(Error(result));
            //     }
            // })
    // });
  }

  helpTicketClosed = function(mailObject){
    logger.log("Help Ticket Closed email", "verbose");
    //  return new Promise(function(resolve, reject) {
    mailObject.body = HelpTicketClosedTemplateCompiled(mailObject.context);
    mailObject.to_email = mailObject.email;
    mailObject.subject = 'Help Ticket Closed'; 
    sendGrid(mailObject)
    //  .then(result => {
    //       if (result.statusCode === 202) {     
    //           resolve(result);
    //         } else {
    //           reject(Error(result));
    //         }
    //     })
    // });
  }

  requestCreated = function(mailObject){
     logger.log("Request Created email", "verbose");
      mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
      mailObject.context.CREATE_REQUEST_WHATS_NEXT = emailConfig.CREATE_REQUEST_WHATS_NEXT;
      mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
      mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
      mailObject.cc = cc;
      mailObject.body = RequestCreatedTemplateCompiled(mailObject.context);
      mailObject.to_email = mailObject.email;
      mailObject.subject = 'Product Request Created'; 

      sendGrid(mailObject)
  }

  requestUpdated = function(mailObject){
    logger.log("Request Update email", "verbose");
    // return new Promise(function(resolve, reject) {
      mailObject.body = RequestUpdatedTemplateCompiled(mailObject.context);
      mailObject.to_email = mailObject.email;
      mailObject.subject = 'Product Request Updated'; 
       sendGrid(mailObject)
          // .then(result => {
          //     if (result.statusCode === 202) {     
          //       resolve(result);
          //     } else {
          //       reject(Error(result));
          //     }
          // })

      // });
  }

  customerAction = function(mailObject){
    logger.log("Customer Action email", "verbose");
    // return new Promise(function(resolve, reject) {
      mailObject.body = CustomerActionTemplateCompiled(mailObject.context);
      mailObject.to_email = mailObject.email;
      mailObject.subject = mailObject.subject; 
      sendGrid(mailObject)
      //     .then(result => {
            
      //         if (result.statusCode === 202) {     
      //           resolve(result);
      //         } else {                  
      //           reject(Error(result));
      //         }
      //     })

      // });
  }

  genericEmail = function(mailObject){
    logger.log("Generic email", "verbose");    
    // return new Promise(function(resolve, reject) {
      mailObject.body = GenericTemplateCompiled(mailObject.context);
      mailObject.to_email = mailObject.email;
      mailObject.subject = mailObject.subject; 
      sendGrid(mailObject)
        // .then(result => {
        //     if (result.statusCode === 202) {     
        //       resolve(result);
        //     } else {
        //       reject(Error(result));
        //     }
        // })
    // });
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

} else {
   var  nodemailer = require('nodemailer'),
        handlebars = require('express-handlebars'),
        exphbs = require('nodemailer-express-handlebars');

  var smtpConfig = {
    host: config.smtp
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
            logger.log(result, 'verbose ');
        })
        .catch(error => {         
            logger.log(error, 'error');
        })
  };

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

                 var mail = {
                    from: config.emailAddress,
                    to: mailObject.email,
                    subject: 'UWM UCC Account Created',
                    template: 'welcome',
                    context: context
                  };

                nodeMailerSendMail(mail)

                if(facultyCoordinatorEmail){               
                    var context = {fullName: fullName}; 
                    var mail = {
                      from: config.emailAddress,
                      to: facultyCoordinatorEmail,
                      subject: 'UWM UCC Account Created',
                      template: 'welcome',
                      context: context
                    };

                    nodeMailerSendMail(mail)
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
      var toEmail = mailObject.cc ? mailObject.email + ',' + mailObject.cc : mailObject.email;
console.log(toEmail)      
      var mail = {
        from: toEmail,
        to: mailObject.email,
        subject: 'Help Ticket Created',
        template: 'help-ticket-created',
        context: mailObject.context
      };

      nodeMailerSendMail(mail)  
  }

  helpTicketUpdated = function(mailObject){
      logger.log("Help Ticket Update email", "verbose");
      //  return new Promise(function(resolve, reject) {
          var mail = {
              from: config.emailAddress,
              to: mailObject.email,
              subject: 'Help Ticket Updated',
              template: 'help-ticket-updated',
              context: mailObject.context
            };

          nodeMailerSendMail(mail)
      //     .then(result => {      
      //           if (result.rejected.length === 0) {     
      //             resolve(result);
      //           } else {
      //             reject(Error(result));
      //           }
      //       })
      //  });
  }

  helpTicketClosed = function(mailObject){
    logger.log("Help Ticket Closed email", "verbose");
    //  return new Promise(function(resolve, reject) {
     var mail = {
          from: config.emailAddress,
          to: mailObject.email,
          subject: 'Help Ticket Closed',
          template: 'help-ticket-closed',
          context: mailObject.context
      };

      nodeMailerSendMail(mail)
    //   .then(result => {      
    //             if (result.rejected.length === 0) {     
    //               resolve(result);
    //             } else {
    //               reject(Error(result));
    //             }
    //         })
    // });   
  }

  requestCreated = function(mailObject){
     logger.log("Request Created email", "verbose");
      mailObject.context.UCC_LOGO = emailConfig.UCC_LOGO;
      mailObject.context.CREATE_REQUEST_WHATS_NEXT = emailConfig.CREATE_REQUEST_WHATS_NEXT;
      mailObject.context.UCC_PHONE = emailConfig.UCC_PHONE;
      mailObject.context.UCC_EMAIL = emailConfig.UCC_EMAIL;
      var mail = {
            from: config.emailAddress,
            to: mailObject.email,
            subject: 'Product Request Created',
            template: 'client-request-created',
            cc: mailObject.cc,
            context: mailObject.context
        };

        nodeMailerSendMail(mail) 
  }

  requestUpdated = function(mailObject){
    logger.log("Request Update email", "verbose");
    // return new Promise(function(resolve, reject) {
      var mail = {
          from: config.emailAddress,
          to: mailObject.email,
          subject: 'Product Request Updated',
          template: 'client-request-updated',
          context: mailObject.context
      };

      nodeMailerSendMail(mail)
    //         .then(result => {      
    //               if (result.rejected.length === 0) {     
    //                 resolve(result);
    //               } else {
    //                 reject(Error(result));
    //               }
    //           })
    // });   
  }

  customerAction = function(mailObject){
    logger.log("Customer Action email", "verbose");
    //  return new Promise(function(resolve, reject) {
        var mail = {
            from: config.emailAddress,
            to: mailObject.email,
            subject: 'Customer Action Required',
            template: 'client-request-customer-action',
            context: mailObject.context
        };

        nodeMailerSendMail(mail)
    //     .then(result => {      
    //           if (result.rejected.length === 0) {     
    //             resolve(result);
    //           } else {
    //             reject(Error(result));
    //           }
    //       })
    // });   
  }

  genericEmail = function(mailObject){
    logger.log("Generic email", "verbose");  
    // return new Promise(function(resolve, reject) {
      var mail = {
          from: config.emailAddress,
          to: mailObject.email,
          subject: mailObject.subject,
          template: 'generic',
          context: mailObject.context
      };
      nodeMailerSendMail(mail)
    //   .then(result => {      
    //         if (result.rejected.length === 0) {     
    //           resolve(result);
    //         } else {
    //           reject(Error(result));
    //         }
    //     })
    // });      
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
          from: config.emailAddress,
          to: mailObject.email,
          subject: mailObject.subject,
          template: 'password-reset',
          context: mailObject.context
      };
      nodeMailerSendMail(mail)   
  }

}
