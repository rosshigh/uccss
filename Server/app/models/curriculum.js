var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema

var CurriculumCategorySchema = new Schema({
	name: { type: String},
	description: { type: String }
});

module.exports = Mongoose.model('CurriculumCategory', CurriculumCategorySchema);

var CurriculumSchema = new Schema({
	category: { type: String },
	title: { type: String, require: true },
	description:  { type: String, require: true },
	products: [ { type: Schema.Types.ObjectId } ],
	notes: { type: String },
	rating: { type: Number },
	comments: [ { type: String } ],
	dateCreated: { type: Date, require: true, default: Date.now },
	dateModified: { type: Date, require: true, default: Date.now },

});

CurriculumSchema.pre('update', function() {
  this.update({},{ $set: { dateModified: new Date() } });
});


module.exports = Mongoose.model('Curriculum', CurriculumSchema);
