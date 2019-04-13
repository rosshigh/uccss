var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;
Person = require('./people').Person;

var InstitutionSchema = new Schema({
    name: { type: String, required: true },
    abrCode: { type: String },
    apj: { type: Boolean, default: false },
    memberType: { type: String, required: true, max: 2 },
    institutionType: { type: String, required: true, max: 2 },
    institutionStatus: { type: String, required: true, max: 2 },
    highestDegree: { type: String, required: true, max: 2 },
    universityDept: { type: String },
    joinDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    dropDate: { type: Date },
    address1: { type: String },
    address2: { type: String },
    POBox: { type: String },
    city: { type: String },
    region: { type: String },
    country: { type: String },
    postalCode: { type: String },
    timeZone: { type: String },
    url: { type: String },
    key: { type: String },
    faculty: [ {type: Schema.Types.ObjectId, ref: 'person'} ],
    packageId: { type: Schema.Types.ObjectId }
});

InstitutionSchema.pre('update', function() {
  this.update({},{ $set: { modifiedDate: new Date() } });
});

module.exports = Mongoose.model('Institution',InstitutionSchema);
