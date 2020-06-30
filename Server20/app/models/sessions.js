var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var SessionSchema = new Schema({
  session: { type: String, require: true },
  year: { type: String, require: true },
  startDate: { type: Date, require: true },
  endDate: { type: Date, require: true },
  requestsOpenDate: { type: Date, require: true },
  sessionStatus: { type: String, require: true },
  sortOrder: { type: Number }

});

module.exports = Mongoose.model('Session', SessionSchema);

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
