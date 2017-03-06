var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;
  
var NoteSchema = new Schema({
    personId: { type: Schema.Types.ObjectId },
    reference: { type: Schema.Types.ObjectId },
    helpTicketNo: { type: Number },
    dateCreated: { type: Date, default: Date.now },
    dateRemind: { type: Date },
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