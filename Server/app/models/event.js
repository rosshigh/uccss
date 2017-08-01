var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var EventSchema = new Schema({
  id: { type: String },
  allDay: { type: Boolean },
  personId: { type: Schema.Types.ObjectId },
  dateCreated: { type: Date, default: Date.now },
  start: { type: Date, default: Date.now },
  end: { type: Date, default: Date.now },
  title: { type: String },
  url: { type: String },
  eventType: { type: String },
  eventReference: { type: Schema.Types.ObjectId },
  eventActive: { type: Boolean, default: true },
  notes: { type: String }
});

module.exports = Mongoose.model('Event', EventSchema);