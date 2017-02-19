var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;
  
var NoteSchema = new Schema({
    personId: { type: Schema.Types.ObjectId },
    reference: { type: Schema.Types.ObjectId },
    helpTicketNo: { type: Number },
    dateCreated: { type: Date, default: Date.now },
    note: { type: String },
    category: { type: String }
});

module.exports = Mongoose.model('Note', NoteSchema);