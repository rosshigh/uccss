var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var CountersSchema = new Schema({
  id: { type: String },
  seq: { type: Number, default: 1 }
});

module.exports = Mongoose.model('Counters', CountersSchema);
