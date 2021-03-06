var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var EventSchema = new Schema({
  id: { type: String },
  allDay: { type: Boolean },
  personId: { type: Schema.Types.ObjectId },
  dateCreated: { type: Date, default: Date.now },
  start: { type: Object },
  end: { type: Object },
  title: { type: String },
  url: { type: String },
  eventType: { type: String },
  eventReference: { type: Schema.Types.ObjectId },
  eventActive: { type: Boolean, default: true },
  notes: { type: String },
  scope: { type: String }
});

module.exports = Mongoose.model('Event', EventSchema);