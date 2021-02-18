var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  AutoIncrement = require('mongoose-sequence')(Mongoose);

// var DocumentSchema = new Schema({
//   name: { type: String, require: true },
//   description: { type: String },
//   active: { type: Boolean, default: true },
//   files: [{
//     originalFilename: { type: String },
//     fileName: { type: String },
//     dateUploaded: { type: Date, default: Date.now },
//     active: { type: Boolean },
//     personId: { type: Schema.Types.ObjectId },
//     version: { type: Number }
//   }],
//   createdDate: { type: Date, default: Date.now, require: true }
// });

// module.exports = Mongoose.model('Document', DocumentSchema);

// var DocumentSubSubCategorySchema = new Schema({
//   SubSubCatCode: { type: Number },
//   description: { type: String, required: true },
//   active: { type: Boolean, default: true },
//   sortOrder: { type: Number, default: 0 },
//   documents: ['Document']
// });

// DocumentSubSubCategorySchema.plugin(AutoIncrement, { inc_field: 'SubSubCatCode' });

// module.exports = Mongoose.model('DocSubSubCategory', DocumentSubSubCategorySchema);

// var DocumentSubCategorySchema = new Schema({
//   SubCatCode: { type: Number },
//   description: { type: String, required: true },
//   active: { type: Boolean, default: true },
//   sortOrder: { type: Number, default: 0 },
//   subSubCategories: ['DocSubSubCategory']
// });

// DocumentSubCategorySchema.plugin(AutoIncrement, { inc_field: 'SubCatCode' });

// module.exports = Mongoose.model('DocSubCategory', DocumentSubCategorySchema);

var DocumentCategorySchema = new Schema({
  DocCode: { type: Number },
  name: { type: String },
  size: { type: Number },
  description: { type: String },
  active: { type: Boolean, default: true },
  displayDate: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },
  subCategories: [ {type: Schema.Types.Mixed }],
  type: { type: String },
  sortOrder: { type: Number, default: 0 },
  category: { type: String }
});

DocumentCategorySchema.plugin(AutoIncrement, { inc_field: 'DocCode' });

module.exports = Mongoose.model('DocCategory', DocumentCategorySchema);


