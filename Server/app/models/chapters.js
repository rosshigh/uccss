var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var ChaptersSchema = new Schema({
    chapterName: { type: String },
    chapterTopic: { type: String },
    chapterURL: { type: String },
    chapterUniversity: { type: String },
    chapterAddress:  { type: String },
    chapterCity:  { type: String },
    chapterRegion: { type: String },
    chapterPostalCode: { type: String },
    chapterContact: { type: Schema.Types.ObjectId },
    chapterLogo: { type: String }
});

module.exports = Mongoose.model('Chapter', ChaptersSchema);