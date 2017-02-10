var Mongoose = require('mongoose'),
  	Schema = Mongoose.Schema;

var helpTicketTypesSchema = new Schema({
  category: { type: Number },
  description: { type: String },
  message: { type: String },
  showSubtypes: { type: Boolean },
  subtypes: [
    {
      type: { type: Number },
      description: { type: String },
      message: { type: String },
      inputForm: { type: String },
      displayForm: { type: String },
      clientRequired: { type: Boolean },
      appsRequired:{ type: Boolean },
      public: { type: Boolean }
    }
  ]
});

module.exports = Mongoose.model('HelpTicketTypes', helpTicketTypesSchema);
