var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema,
  Bcrypt = require('bcryptjs');

  var ReminderSchema = new Schema({
    reminder: { type: String },
    description: { type: String},
    expirationDate: { type: Date },
    dueDate: { type: Date },
    createdDate: { type:Date, default: Date.now },
    personal: { type: Boolean },
    personId: { type: Schema.Types.ObjectId }
});

module.exports = Mongoose.model('Reminder', ReminderSchema);

var EmailLogSchema = new Schema({
    personId: { type: Schema.Types.ObjectId },
    personName: { type: String },
    email: { type: String },
    subject: { type: String },
    body: { type: String },
    from: { type: Schema.Types.Mixed },
    date: { type: Date, default: Date.now },
    topic: { type: String }
});

module.exports = Mongoose.model('EmailLog', EmailLogSchema);

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
  apj: { type: Boolean, default: false },

  //Communication
  email: { type: String, unique: true, required: true },
  password: { type: String },
  phone: { type: String },
  ext: { type: String },
  mobile: { type: String },
  fax: { type: String },
  file: {
    originalFilename: { type: String },
    fileName: { type: String },
    dateUploaded: { type: Date, default: Date.now }
  } ,

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
  institutionId: { type: Schema.Types.ObjectId, required: true, ref: 'Institution' },
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

module.exports = Mongoose.model('Person', PersonSchema);
module.exports = Mongoose.model('PersonArchive', PersonSchema);


var NotificationSchema = new Schema({
    personId: { type: Schema.Types.ObjectId },
    uccStaffId: { type: Schema.Types.ObjectId },
    notice: { type: String },
    additionalInfo: { type: String },
    dateCreated: { type: Date, default: Date.now },
    checked: { type: Boolean, default: false }
});

module.exports = Mongoose.model('Notification', NotificationSchema);

var CourseSchema = new Schema({
  name: { type: String, required: true },
  personId: { type: Schema.Types.ObjectId, required: true },
  number: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, default: true }
});

module.exports = Mongoose.model('Course', CourseSchema);