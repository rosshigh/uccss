var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Person = require('./people').Person,
  AutoIncrement = require('mongoose-sequence');

var helpTicketLockSchema = new Schema({
  helpTicketId: { type: Schema.Types.ObjectId },
  personId: { type: Schema.Types.ObjectId },
  createdAt: { type: Date, expires: '1800s', default: Date.now }
});

module.exports = Mongoose.model('HelpTicketLock', helpTicketLockSchema);

var HelpTicketContentSchema = new Schema({
  type: { type: Number, required: true},
  createdDate: { type: Date, default: Date.now, required: true },
  emailSent: { type: Boolean },
  files: [ {
    originalFilename: { type: String },
    fileName: { type: String },
    dateUploaded: { type: Date, default: Date.now }
  } ],
  confidential: { type: Boolean, default: false },
  personId: { type: Schema.Types.ObjectId, ref: 'person' },
  content: { type: Schema.Types.Mixed }
});

module.exports = Mongoose.model('HelpTicketContent', HelpTicketContentSchema);

var HelpTicketSchema = new Schema({
  createdDate: { type: Date, default: Date.now, required: true },
  modifiedDate: { type: Date, default: Date.now, required: true },
  sessionId: {type: Schema.Types.ObjectId },
  courseId: {type: Schema.Types.ObjectId },
  helpTicketType: { type: String, required: true },
  helpTicketStatus: { type: Number, required: true },
  keyWords: { type: String },
  personId: { type: Schema.Types.ObjectId, ref: 'person' },
  institutionId: { type: Schema.Types.ObjectId },
  content: [HelpTicketContentSchema],
  owner: [{
    personId: { type: Schema.Types.ObjectId },
    dateAssigned: { type: Date, default: Date.now }
  }],
  audit: [{
    property: { type: String, default: 'Created' },
    eventDate: { type: Date, default: Date.now },
    oldValue: { type: Schema.Types.Mixed },
    personId: { type: Schema.Types.ObjectId }
  }]
});

HelpTicketSchema.plugin(AutoIncrement, {inc_field: 'helpTicketNo'});

HelpTicketSchema.pre('update', function() {
  this.update({},{ $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('HelpTicket', HelpTicketSchema);
