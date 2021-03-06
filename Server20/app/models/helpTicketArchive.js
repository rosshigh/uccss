var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Person = require('./people').Person;

var HelpTicketContentSchema = new Schema({
  type: { type: String, required: true},
  createdDate: { type: Date, default: Date.now, required: true },
  emailSent: { type: Boolean },
  files: [ {
    originalFilename: { type: String },
    fileName: { type: String },
    dateUploaded: { type: Date, default: Date.now }
  } ],
  confidential: { type: Boolean, default: false },
  personId: { type: Schema.Types.ObjectId, ref: 'Person' },
  content: { type: Schema.Types.Mixed },
  displayForm: { type: String },
	documents: [{
		categoryCode: { type: Number },
		categoryName: { type: String },
		fileName: { type: String },
		default: { type: Boolean, default: true } 
	}]
}, { versionKey: false });

module.exports = Mongoose.model('HelpTicketContent', HelpTicketContentSchema);

var HelpTicketSchema = new Schema({
  productId: {type: Schema.Types.ObjectId },
  createdDate: { type: Date, default: Date.now, required: true },
  modifiedDate: { type: Date, default: Date.now, required: true },
  sessionId: {type: Schema.Types.ObjectId },
  courseId: {type: Schema.Types.ObjectId, ref: 'Course' },
  helpTicketType: { type: String },
  helpTicketCategory: { type: String },
  helpTicketStatus: { type: Number, required: true },
  keyWords: { type: String },
  personId: { type: Schema.Types.ObjectId, ref: 'Person' },
  institutionId: { type: Schema.Types.ObjectId, ref: 'Institution' },
  requestId: { type: Schema.Types.ObjectId, ref: 'ClientRequestDetail' },
  systemId: {type: Schema.Types.ObjectId },
  client: {type: Number },
  priority: { type: Number },
  content: [HelpTicketContentSchema],
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

module.exports = Mongoose.model('HelpTicketArchive', HelpTicketSchema);