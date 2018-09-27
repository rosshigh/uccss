var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var ChaptersSchema = new Schema({
    chapterName: { type: String },
    chapterShortDescription: { type: String },
    chapterTopic: { type: String },
    chapterURL: { type: String },
    chapterUniversity: { type: String },
    chapterAddress1:  { type: String },
    chapterAddress2:  { type: String },
    chapterCity:  { type: String },
    chapterRegion: { type: String },
    chapterPostalCode: { type: String },
    chapterContact: { type: Schema.Types.ObjectId },
    chapterLogo: { type: String }
});

module.exports = Mongoose.model('Chapter', ChaptersSchema);