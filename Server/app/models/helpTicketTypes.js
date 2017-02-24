var Mongoose = require('mongoose'),
  	Schema = Mongoose.Schema;

var helpTicketTypesSchema = new Schema({
  category: { type: Number },
  description: { type: String },
  message: { type: String },
  showSubtypes: { type: Boolean },
  requestsRequired: { type: Boolean },
  subtypes: [
    {
      type: { type: String },
      description: { type: String },
      message: { type: String },
      inputForm: { type: String },
      outputForm: { type: String },
      active: { type: Boolean, default: true },
      clientRequired: { type: Boolean },
      appsRequired:{ type: Boolean },
      public: { type: Boolean },
      requestKeywords: { type: String },
      documents: [{
        categoryCode: { type: Number },
        categoryName: { type: String },
        fileName: { type: String },
        default: { type: Boolean, default: true } 
      }],
      validation: [
        {
          rule: { type: String },
          control: { type: String },
          value: { type: String },
          message: { type: String }
        }
      ]
    }
  ]
});

module.exports = Mongoose.model('HelpTicketTypes', helpTicketTypesSchema);
