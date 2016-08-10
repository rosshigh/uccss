var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var TestDetailSchema = new Schema({
  detail: { type: String }
});

module.exports = Mongoose.model('TestDetail', TestDetailSchema);

var TestSchema = new Schema({
  test: { type: String },
  details: [ { type: Schema.Types.ObjectId, ref: 'TestDetail'  } ]
});

module.exports = Mongoose.model('Test', TestSchema);
