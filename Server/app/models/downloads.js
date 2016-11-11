var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  AutoIncrement = require('mongoose-sequence');

var CategorySchema = new Schema({
  downCatcode: { type: Number },
  description: { type: String, required: true }
});

CategorySchema.plugin(AutoIncrement, {inc_field: 'downCatcode'});

module.exports = Mongoose.model('AppCategory', CategorySchema);

var DownloadSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String },
  downCatcode: { type: Number },
  file: {
    originalFilename: { type: String },
    fileName: { type: String },
    dateUploaded: { type: Date, default: Date.now }
  },
  createdDate: { type: Date, default: Date.now, require: true },
  active: { type: Boolean, default: true, require: true },
  helpTicketRelevant: { type: Boolean }
});

module.exports = Mongoose.model('Download', DownloadSchema);
