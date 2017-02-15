var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var BlogSchema = new Schema({
	personId: { type: Schema.Types.ObjectId },
	dateCreated: { type: Date,  default: Date.now },
	title: { type: String },
	text: { type: String },
	teaser: { type: String },
	likes: { type: Number, default: 0 },
	views: { type: Number, default: 0 },
	active: { type: Boolean, default: false }
});

module.exports = Mongoose.model('Blog', BlogSchema);

var ForumSchema = new Schema({
	 dateCreated: { type: Date,  default: Date.now },
	 personId: { type: Schema.Types.ObjectId },
	 title: { type: String },
	 text: { type: String },
	 lastPostDate: { type: Date },
	 type: { type: String, default: "General" },
	 topics: { type: Number, default: 0 },
	 posts: { type: Number, default: 0 },
	 active: { type: Boolean, default: true }
});

module.exports = Mongoose.model('Forum', ForumSchema);

var ForumMessage = new Schema({
	 personId: { type: Schema.Types.ObjectId },
	 discusssionId: { type: Schema.Types.ObjectId },
	 dateCreated: { type: Date,  default: Date.now },
	 title: { type: String },
	 text: { type: String },
	 parentId: { type: Schema.Types.ObjectId },
	 children: [ { type: Schema.Types.ObjectId, ref: 'Forum' } ],
	 level: { type: Number, default: 0 }
});

module.exports = Mongoose.model('ForumMessage', ForumMessage);