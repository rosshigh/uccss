var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  AutoIncrement = require('mongoose-sequence');

var DocumentCategorySchema = new Schema({
  code: { type: Number },
  description: { type: String, required: true },
  active: { type: Boolean, default: true }
});

DocumentCategorySchema.plugin(AutoIncrement, {inc_field: 'code'});

module.exports = Mongoose.model('DocCategory', DocumentCategorySchema);

var DocumentSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String },
  categoryCode: { type: Number },
  active: { type: Boolean, default: true },
  files: [{
    originalFilename: { type: String },
    fileName: { type: String },
    dateUploaded: { type: Date, default: Date.now },
    active: { type: Boolean },
    personId: { type: Schema.Types.ObjectId },
    version: { type: Number }
  }],
  createdDate: { type: Date, default: Date.now, require: true }
});

module.exports = Mongoose.model('Document', DocumentSchema);
