var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Product = require('./products').Product,
  AutoIncrement = require('mongoose-sequence');

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
  clientId: { type: Schema.Types.ObjectId },
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
});

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
  requestId: { type: Schema.Types.ObjectId, ref: 'ClientRequest'},
  idsAssigned: { type: Number },
  customerMessage: { type: String },
  files: [{
    name: {type: String},
    url: {type: String},
    comments: {type: String}
  }],
  assignments: ['Assignment'],
  techComments: { type: String },
  audit: [{
    property: { type: String, default: 'Created' },
    eventDate: { type: Date, default: Date.now },
    oldValue: { type: Schema.Types.Mixed },
    personId: { type: Schema.Types.ObjectId }
  }]
});

//ClientRequestDetailsSchema.plugin(autoIncrement.plugin, { model: 'ClientRequestDetail', field: 'requestNo' });
ClientRequestDetailsSchema.plugin(AutoIncrement, {inc_field: 'requestNo'});

ClientRequestDetailsSchema.pre('update', function() {
  this.update({},{ $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('ClientRequestDetail', ClientRequestDetailsSchema);

var ClientRequestSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId },
  personId: { type:  Schema.Types.ObjectId },
  sessionId: { type: Schema.Types.ObjectId, required: true },
  studentIdsAssigned: { type: Number },
  graduateIds: { type: Number, default: 0, min : 0 },
  undergradIds: { type: Number, default: 0, min: 0 },
  addUndergraduates: { type: Number, default: 0, min: 0 },
  addGraduates: { type: Number, default: 0, min: 0 },
  comments: { type: String },
  whereHosted: { type: String, default: 'UCC' },
  startDate: { type: Date },
  endDate: { type: Date },
  requestStatus: { type: String },
  modifiedDate: { type: Date },
  requestDetails: [ { type: Schema.Types.ObjectId, ref: 'ClientRequestDetail' } ],
  institutionId: { type: Schema.Types.ObjectId },
  audit: [{
    property: { type: String, default: 'Created' },
    eventDate: { type: Date, default: Date.now },
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    personId: { type: Schema.Types.ObjectId }
  }]
});

ClientRequestSchema.pre('update', function() {
  this.update({},{ $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('ClientRequest', ClientRequestSchema);
