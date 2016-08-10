var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var SessionSchema = new Schema({
  session: { type: String, require: true },
  year: { type: String, require: true },
  startDate: { type: Date, require: true },
  endDate: { type: Date, require: true },
  requestsOpenDate: { type: Date, require: true },
  sessionStatus: { type: String, require: true }

});

module.exports = Mongoose.model('Session', SessionSchema);
