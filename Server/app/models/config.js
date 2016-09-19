var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var ConfigSchema = new Schema({
  parameter: { type: String },
  value: { type: Schema.Types.Mixed }
});

module.exports = Mongoose.model('Config', ConfigSchema);