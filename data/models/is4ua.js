var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

 var typeTemplate = {
   description: { type: String },
   code: { type: String }
 };

var is4uaSchema = new Schema({
  deptCat: [ typeTemplate ],
  personRoles: [ typeTemplate ],
  personSpecialization: [ typeTemplate ],
  personStatus: [ typeTemplate ],
  memberTypes: [ typeTemplate ],
  institutionTypes: [ typeTemplate ],
  institutionStatus: [ typeTemplate ],
  highestDegree: [ typeTemplate ],
  uaCurriculum: [ typeTemplate ],
  uaDatasets: [ typeTemplate ],
  sapProducts: [ typeTemplate ]
});

module.exports = Mongoose.model('is4ua',is4uaSchema);
