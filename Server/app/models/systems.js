var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Client = Mongoose.model('Client');

var SystemSchema = new Schema({
  sid: { type: String, require: true },
  description: { type: String, require: true },
  server: { type: String, require: true },
  instance: { type: String, require: true },
  its: { type: String },
  terms: { type: String },
  productId: { type: Schema.Types.ObjectId },
  idsAvailable: { type: Number },
  clients: [ { type: Schema.Types.ObjectId, ref: 'Client' } ],
  active: { type: Boolean, default: true},
  dateModified: { type: Date }
});

SystemSchema.pre('update', function() {
  this.update({},{ $set: { dateModified: new Date() } });
});

module.exports = Mongoose.model('System', SystemSchema);
