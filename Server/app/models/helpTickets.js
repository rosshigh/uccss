var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Person = require('./people').Person,
  AutoIncrement = require('mongoose-sequence');

var helpTicketLockSchema = new Schema({
  helpTicketId: { type: Schema.Types.ObjectId },
  personId: { type: Schema.Types.ObjectId },
  name: { type: String },
  createdAt: { type: Date, expires: '600s', default: Date.now }
});

module.exports = Mongoose.model('HelpTicketLock', helpTicketLockSchema);

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

// HelpTicketSchema.index( {createdDate: -1} );

HelpTicketSchema.plugin(AutoIncrement, {inc_field: 'helpTicketNo', disable_hooks: true});

HelpTicketSchema.pre('update', function() {
  this.update({},{ $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('HelpTicket', HelpTicketSchema);
module.exports = Mongoose.model('HelpTicketArchive', HelpTicketSchema);

var KnoweledgeBaseSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
  personId: { type: Schema.Types.ObjectId },
  category: { type: String },
  subCategory: { type: String },
  title: { type: String },
  keywords: { type: String },
  content: [HelpTicketContentSchema]
});

KnoweledgeBaseSchema.plugin(AutoIncrement, {inc_field: 'knowledgeBaseNo'});

module.exports = Mongoose.model('KnowledgeBase', KnoweledgeBaseSchema);