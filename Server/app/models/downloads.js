var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var CategorySchema = new Schema({
  code: { type: Number, required: true },
  description: { type: String, required: true }
});

module.exports = Mongoose.model('AppCategory', CategorySchema);

var DownloadSchema = new Schema({

});

var DownloadSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String },
  type: { type: String },
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
