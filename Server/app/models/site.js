var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var MessageSchema = new Schema({
  key: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  content: { type: String },
  variables: { type: String }
});

module.exports = Mongoose.model('Message', MessageSchema);

var SiteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  createdDate: { type: Date, default: Date.now },
  expiredDate: { type: Date },
  url: { type: String },
  image: { type: String},
  itemType: { type: String },
  priority: { type: String, enum: ['INFO', 'WARN', 'DANG'] },
  sortOrder: { type: Number },
  category: { type: String },
  file: {
    originalFilename: { type: String },
    fileName: { type: String },
    dateUploaded: { type: Date, default: Date.now }
  }
});

module.exports = Mongoose.model('Site', SiteSchema);
