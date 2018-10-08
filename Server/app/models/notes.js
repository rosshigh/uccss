var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  AutoIncrement = require('mongoose-sequence');
  
var NoteSchema = new Schema({ 
    personId: { type: Schema.Types.ObjectId },
    reference: { type: Schema.Types.ObjectId },
    referenceNo: { type: Number },
    type: { type: String },
    dateCreated: { type: Date, default: Date.now },
    dateStartRemind: { type: Date },
    dateEndRemind: { type: Date },
    isReminder: { type: Boolean, default: false },
    reminderType: { type: String },
    reminderDay: { type: String },
    priority: { type: String, default: 0 },
    lastSeen: { type: Date },
    note: { type: String },
    category: { type: String }
});

module.exports = Mongoose.model('Note', NoteSchema);

var TechNoteSchema = new Schema({
  personId: { type: Schema.Types.ObjectId },
  type: { type: String },
  dateCreated: { type: Date, default: Date.now },
  dateRemind: { type: Date },
  isReminder: { type: Boolean, default: false },
  note: { type: String }, 
  categoryId: { type: Schema.Types.ObjectId },
  productId: { type: Schema.Types.ObjectId },
  systemId: { type: Schema.Types.ObjectId },
  url: { type: String },
  fileReference: { type: String },
  file: {
    originalFilename: { type: String },
    fileName: { type: String },
    dateUploaded: { type: Date, default: Date.now }
  },
});

TechNoteSchema.plugin(AutoIncrement, {inc_field: 'NoteNo'});

module.exports = Mongoose.model('TechNote', TechNoteSchema);

var TechNoteCategorySchema = new Schema({
  category: { type: String }
});

module.exports = Mongoose.model('TechNoteCategory', TechNoteCategorySchema);