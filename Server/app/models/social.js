var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var BlogSchema = new Schema({
	personId: { type: Schema.Types.ObjectId },
	dateCreated: { type: Date,  default: Date.now },
	title: { type: String },
	text: { type: String },
	teaser: { type: String },
	likes: { type: Number},
	views: { type: Number },
	active: { type: Boolean }
});

module.exports = Mongoose.model('Blog', BlogSchema);

var ForumSchema = new Schema({
	 dateCreated: { type: Date,  default: Date.now },
	 title: { type: String },
	 text: { type: String },
	 lastPostDate: { type: Date },
	 type: { type: String }
});

module.exports = Mongoose.model('Forum', ForumSchema);

var ForumMessage = new Schema({
	 personId: { type: Schema.Types.ObjectId },
	 discusssionId: { type: Schema.Types.ObjectId },
	 dateCreated: { type: Date,  default: Date.now },
	 title: { type: String },
	 text: { type: String },
	 parentId: { type: Schema.Types.ObjectId },
	 children: [ { type: Schema.Types.ObjectId, ref: 'Forum' } ]
});

module.exports = Mongoose.model('ForumMessage', ForumMessage);