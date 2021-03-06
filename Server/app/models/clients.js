var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  ClientRequestDetail = require('./clientRequest').ClientRequestDetail;

var ClientsSchema = new Schema({
  systemId: { type: Schema.Types.ObjectId, require: true },
  client: { type: Number, require: true },
  idsAvailable: { type: Number },
  createdDate: { type: Date, require: true, default: Date.now },
  lastIdAssigned: { type: Number, default: 0 },
  lastFacIdAssigned: { type: Number, default: 0 },
  clientStatus: { type: String, require: true },
  productId: {type: Schema.Types.ObjectId },
  firstAllowableID: { type: Number },
  manual: { type: Boolean, default: false },
  assignments: [{
    assignment: {type: Schema.Types.ObjectId, ref: 'ClientRequestDetail'},
    institutionId: {type: Schema.Types.ObjectId},
    studentIDRange: {type: String},
    facultyIDRange: {type: String},
    firstID: { type: Number },
    lastID: { type: Number },
    firstFacID: { type: Number },
    lastFacID: { type: Number},
    statusCurrent: { type: Boolean, default: true }
  }]
});

module.exports = Mongoose.model('Client', ClientsSchema);
