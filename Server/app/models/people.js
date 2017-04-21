var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Bcrypt = require('bcryptjs');

var PasswordResetSchema = new Schema({
    personId: { type: Schema.Types.ObjectId },
    createdAt: { type: Date, expires: '600s', default: Date.now },
    validationCode: { type: String }
});

module.exports = Mongoose.model('PasswordReset', PasswordResetSchema);

var PersonSchema = new Schema({
  //demographics
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  nickName: { type: String },
  gender: { type: String },
  title: { type: String },
  salutation: { type: String },

  //Communication
  email: { type: String, unique: true, required: true },
  password: { type: String },
  phone: { type: String },
  ext: { type: String },
  mobile: { type: String },
  fax: { type: String },

  //Address
  address1: { type: String },
  address2: { type: String },
  city:  { type: String },
  region: { type: String, max: 2 },
  postalCode: { type: String },
  country: { type: String },
  timeZone: { type: String },
  language: { type: String },
  POBox: { type: String },
  institutionId: { type: Schema.Types.ObjectId, required: true },
  noteCategories: [{ type: String }],

  //Site Status
  roles: [{ type: String }],
  active: { type: Boolean, default: false },
  personStatus: { type: String },

  //Classification
  departmentName: { type: String },
  departmentCategory: { type: String, max: 2, default: '99' },
  personSpecialization: { type: String, max: 2, default: '99' },
  academicTitle: { type: String },

  scope:  { type: String, enum: ['admin','user'], default: 'user'},

  dateRegistered: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
  dateInactive: { type: Date },
  courses: [{
    courseNumber: { type: String, required: true },
    courseName: { type: String, required: true },
    courseDescription: { type: String }
  }],
  audit: [{
    property: { type: String, default: 'Created' },
    eventDate: { type: Date, default: Date.now },
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    personId: { type: Schema.Types.ObjectId }
  }]
}, {
    toObject: {
        virtuals: true
    }, toJSON: {
        virtuals: true
    }
});

PersonSchema.pre('update', function() {
  this.update({},{ $set: { dateModified: new Date() } });
});

PersonSchema.pre('save', function(next){
  var person = this;
  if (this.isModified('password') || this.isNew) {
        Bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }         
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }               
                person.password = hash;             
                next();
            });
        });
    } else {
        return next();
    }
});

PersonSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

PersonSchema.virtual('fullName')
  .get(function () {
    return this.firstName + ' ' + this.lastName;
  });

module.exports = Mongoose.model('Person',PersonSchema);