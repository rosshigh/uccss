var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Client = Mongoose.model('Client');

var SystemSchema = new Schema({
  sid: { type: String, require: true },
  description: { type: String, require: true },
  server: { type: String, require: true },
  port: { type: Number },
  instance: { type: String, require: true },
  its: { type: String },
  sessions: [{ type: String }],
  productId: [{ type: Schema.Types.ObjectId }],
  idsAvailable: { type: Number },
  clients: ['Client'],
  active: { type: Boolean, default: true},
  os: { type: String },
  osVersion: { type: String },
  dbType: { type: String },
  dbVersion: { type: String },
  ipAddress: { type: String },
  notes: { type: String },
  dateModified: { type: Date },
  goldBackup: { type: Boolean },
  snapShot: { type: Boolean },
  type: { type: String, default: "ERP" } 
});

SystemSchema.pre('save', function(next){
  var system = this;
  if(!system.productId){
    system.productId = null;
    next();
  }
   return next();
});

SystemSchema.pre('update', function() {
  this.update({},{ $set: { dateModified: new Date() } });
});

module.exports = Mongoose.model('System', SystemSchema);
