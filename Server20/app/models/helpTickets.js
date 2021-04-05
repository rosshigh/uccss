var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  AutoIncrement = require('mongoose-sequence')(Mongoose);

// var HelpTicketContentSchema = new Schema({
//   type: { type: String, required: true},
//   createdDate: { type: Date, default: Date.now, required: true },
//   emailSent: { type: Boolean },
//   files: [ {
//     originalFilename: { type: String },
//     fileName: { type: String },
//     dateUploaded: { type: Date, default: Date.now }
//   } ],
//   confidential: { type: Boolean, default: false },
//   personId: { type: Schema.Types.ObjectId, ref: 'Person' },
//   content: { type: Schema.Types.Mixed },
//   displayForm: { type: String },
// 	documents: [{
// 		categoryCode: { type: Number },
// 		categoryName: { type: String },
// 		fileName: { type: String },
// 		default: { type: Boolean, default: true } 
// 	}]
// }, { versionKey: false });

// module.exports = Mongoose.model('HelpTicketContent', HelpTicketContentSchema);

var HelpTicketSchema = new Schema({
  personId: { type: Schema.Types.ObjectId},
  institutionId: { type: Schema.Types.ObjectId},
  content: { type: Schema.Types.Mixed },
  createdDate: { type: Date, default: Date.now, required: true },
  modifiedDate: { type: Date, default: Date.now, required: true },
  helpTicketStatus: { type: Number, required: true },
  assignedProduct : { type: String },
  curriculum : { type: Boolean },
  software : { type: Boolean },
  notes: { type: String },
  views: [{type: Date }],
  owner: [{
    personId: { type: Schema.Types.ObjectId, ref: 'Person' },
    dateAssigned: { type: Date, default: Date.now }
  }],
  audit: [{
    property: { type: String, default: 'Created' },
    eventDate: { type: Date, default: Date.now },
    newValue: { type: Schema.Types.Mixed },
    oldValue: { type: Schema.Types.Mixed },
    personId: { type: Schema.Types.ObjectId }
  }]
}, { versionKey: false, usePushEach: true } );

// HelpTicketSchema.index( {createdDate: -1} );

HelpTicketSchema.plugin(AutoIncrement, { inc_field: 'helpTicketNo' });

HelpTicketSchema.pre('update', function() {
  this.update({},{ $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('HelpTicket', HelpTicketSchema);