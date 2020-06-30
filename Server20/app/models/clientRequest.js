var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Product = require('./products').Product,
  AutoIncrement = require('mongoose-sequence')(Mongoose);

var clientRequestLockSchema = new Schema({
  requestId: { type: Schema.Types.ObjectId },
  personId: { type: Schema.Types.ObjectId },
  createdAt: { type: Date, expires: '1800s', default: Date.now }
});

module.exports = Mongoose.model('ClientRequestLock', clientRequestLockSchema);

var CourseSchema = new Schema({
  name: { type: String, required: true },
  personId: { type: Schema.Types.ObjectId, required: true },
  number: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, default: true }
});

module.exports = Mongoose.model('Course', CourseSchema);

var AssignmentSchema = new Schema({
  systemId: { type: Schema.Types.ObjectId },
  client: { type: Number },
  studentUserIds: { type: String },
  studentPassword: { type: String },
  facultyUserIds: { type: String },
  facultyPassword: { type: String },
  staffId: { type: Schema.Types.ObjectId },
  assignedDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  firstID: { type: Number },
  lastID: { type: Number },
  firstFacID: { type: Number },
  lastFacID: { type: Number }
}, { versionKey: false });

AssignmentSchema.pre('update', function() {
  this.update({},{ $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('Assignment', AssignmentSchema);

var ClientRequestDetailsSchema = new Schema({
  requestNo: { type: Number },
  createdDate: { type: Date, default: Date.now },
  requiredDate: { type: Date },
  modifiedDate: { type: Date, default: Date.now },
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
  requestStatus: { type: String },
  sessionId: { type: Schema.Types.ObjectId },
  requestId: { type: Schema.Types.ObjectId }, //, ref: 'ClientRequest'
  idsAssigned: { type: Number },
   documents: [{
    url: { type: String } 
  }],
  assignments: ['Assignment'],
  techComments: { type: String },
  customerMessage: { type: String },
  audit: [{
    property: { type: String, default: 'Created' },
    eventDate: { type: Date, default: Date.now },
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    personId: { type: Schema.Types.Mixed }
  }]
}, { versionKey: false });

ClientRequestDetailsSchema.plugin(AutoIncrement, {inc_field: 'requestNo'});

ClientRequestDetailsSchema.pre('update', function() {
  this.update({},{ $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('ClientRequestDetail', ClientRequestDetailsSchema);

var ClientRequestSchema = new Schema({
  clientRequestNo: { type: Number },
  courseId: { type: Schema.Types.ObjectId },
  personId: { type:  Schema.Types.ObjectId },
  sessionId: { type: Schema.Types.ObjectId },
  studentIdsAssigned: { type: Number }, 
  graduateIds: { type: Number, default: 0, min : 0 },
  undergradIds: { type: Number, default: 0, min: 0 },
  comments: { type: String },
  whereHosted: { type: String, default: 'UCC' },
  startDate: { type: Date },
  endDate: { type: Date },
  requestStatus: { type: String },
  modifiedDate: { type: Date },
  requestDetails: [ { type: Schema.Types.ObjectId } ], //, ref: 'ClientRequestDetail'
  institutionId: { type: Schema.Types.ObjectId },
  customerMessage: { type: String },
  audit: [{
    property: { type: String, default: 'Created' },
    eventDate: { type: Date, default: Date.now },
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    personId: { type: Schema.Types.Mixed }
  }]
}, { versionKey: false });

ClientRequestSchema.plugin(AutoIncrement, {inc_field: 'clientRequestNo'});

ClientRequestSchema.pre('update', function() {
  this.update({},{ $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('ClientRequest', ClientRequestSchema);
