var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

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