var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Product = require('./products').Product,
  AutoIncrement = require('mongoose-sequence')(Mongoose);

var PackageSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  uccPayment: { type: Number },
  maxClients: { type: Number }
});

module.exports = Mongoose.model('Packages', PackageSchema); 

var InstitutionPackageSchema = new Schema({
  institutionId: { type: Schema.Types.ObjectId },
  packageId: { type: Schema.Types.ObjectId },
  dateStarted: { type: Date, default: Date.now },
  dateEnded: { type: Date, default: null },
  dateInvoiced: { type: Date, default: null },
  datePaid: { type: Date, default: null },
  amount: { type: Number }
}); 

module.exports = Mongoose.model('InstitutionPackage', InstitutionPackageSchema);

var CustomerPackageSchema = new Schema({
  packageId: { type: Schema.Types.ObjectId },
  institutionId: { type: Schema.Types.ObjectId },
  dateCreated: { type: Date, default: Date.now },
  requests: []
});

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

AssignmentSchema.pre('update', function () {
  this.update({}, { $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('AssignmentAPJ', AssignmentSchema);

var ClientRequestDetailsSchema = new Schema({
  invoiceRelevant: { type: Boolean, default: false },
  requestNo: { type: Number },
  createdDate: { type: Date, default: Date.now },
  numberOfStudents: { type: Number },
  requiredDate: { type: Date },
  modifiedDate: { type: Date, default: Date.now },
  withinPackage: { type: Boolean, default: true },
  dateInvoiced: { type: Date },
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
  price: { type: Number },
  requestStatus: { type: String },
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

ClientRequestDetailsSchema.plugin(AutoIncrement, { inc_field: 'requestNoAPJ' });

ClientRequestDetailsSchema.pre('update', function () {
  this.update({}, { $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('ClientRequestDetailAPJ', ClientRequestDetailsSchema);

var ClientRequestSchema = new Schema({
  clientRequestNo: { type: Number },
  invoiceRelevant: { type: Boolean, defualt: false },
  invoiceDate: { type: Date },
  amount: { type: Number },
  comments: { type: String },
  whereHosted: { type: String, default: 'UCC' },
  requestStatus: { type: String },
  modifiedDate: { type: Date },
  requestDetails: [{ type: Schema.Types.ObjectId }], //, ref: 'ClientRequestDetail'
  institutionId: { type: Schema.Types.ObjectId },
  customerMessage: { type: String },
  active: { type: Boolean, default: true },
  audit: [{
    property: { type: String, default: 'Created' },
    eventDate: { type: Date, default: Date.now },
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    personId: { type: Schema.Types.Mixed }
  }]
}, { versionKey: false });

ClientRequestSchema.plugin(AutoIncrement, { inc_field: 'clientRequestNoAPJ' });

ClientRequestSchema.pre('update', function () {
  this.update({}, { $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('ClientRequestAPJ', ClientRequestSchema);

var InvoiceSchema = new Schema({
  createdDate: { type: Date, default: Date.now },
  invoiceNumber: { type: String },
  invoiceItems: {type: Schema.Types.Mixed },
  issuedDate: { type: Date },
  Amount: { type: Number },
  datePaid: { type: Date }
});

InvoiceSchema.plugin(AutoIncrement, { inc_field: 'invoiceNo' });

module.exports = Mongoose.model('Invoice', InvoiceSchema);

var ACCInvoiceData = new Schema({
  invoicePeriod: { type: String },
  invoiceDay: { type: Number },
  invoiceMonth: { type: Number },
  invoiceEndDay: { type: Number },
  invoiceEndMonth: { type: Number }
});

module.exports = Mongoose.model('InvoiceData', ACCInvoiceData);