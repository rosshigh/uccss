var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var ProductSchema = new Schema({
  clientKey: { type: Number },
  name: { type: String, require: true }, 
  clientInfo: { type: String },
  productInfo: { type: String },
  productInfoApj: { type: String },
  productDescription: { type: String },
  status: { type: String },
  active: { type: Boolean, require: true },
  clientRelevant: { type: Boolean },
  idsAvailable: { type: Number },
  documents: [{
    categoryCode: { type: Number }, 
    categoryName: { type: String },
    fileName: { type: String },
    default: { type: Boolean, default: true } 
  }],
  files: [ {
    originalFilename: { type: String },
    fileName: { type: String },
    dateUploaded: { type: Date, default: Date.now }
  } ],
  uaCurriculum: { type: String },
  sapProduct: { type: String },
  uaDataset: { type: String },
  hostWhere: { type: String },
  systems: [{
    sid: { type: String },
    systemId: { type: Schema.Types.ObjectId }
  }],
  defaultStudentIdPrefix: { type: String },
  defaultStudentPassword: { type: String },
  defaultFacultyIdPrefix: { type: String },
  defaultFacultyPassword: { type: String },
  comment: { type: String },
  firstAllowableId: { type: String },
  lastAllowableId: { type: String },
  dateCreated: { type: Date, default: Date.now  },
  dateModified: { type: Date, default: Date.now  },
  apj: { type: Boolean, default: false }
});

ProductSchema.pre('update', function() {
  this.update({},{ $set: { dateModified: new Date() } });
});

module.exports = Mongoose.model('Product', ProductSchema);
