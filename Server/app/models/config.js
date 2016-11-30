var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var SemesterConfigSchema = new Schema({
  session: { type: String },
  startMonth: { type: String },
  startDay: { type: String },
  endMonth:  { type: String },
  endDay: { type: String },
  openMonth: { type: String },
  openDay: { type: String },
  dateModified: { type: Date, default: Date.now }
});

SemesterConfigSchema.pre('update', function() {
  this.update({},{ $set: { dateModified: new Date() } });
});

module.exports = Mongoose.model('SemesterConfig', SemesterConfigSchema);

var ConfigSchema = new Schema({
  parameter: { type: String },
  value: { type: Schema.Types.Mixed },
  dateModified: { type: Date, default: Date.now },
  readOnly: { type: Boolean, default: false },
  type: { type: String },
  description: { type: String }
});

ConfigSchema.pre('update', function() {
  this.update({},{ $set: { dateModified: new Date() } });
});


module.exports = Mongoose.model('Config', ConfigSchema);