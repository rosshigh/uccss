'use strict'

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Person = mongoose.model('Person'),
    Course = mongoose.model('Course'),
    Reminder = mongoose.model('Reminder'),
    asyncHandler = require('express-async-handler'),
    http = require('http'),
    PasswordReset = mongoose.model('PasswordReset'),
    logger = require('../../config/logger'),
    passportService = require('../../config/passport'),
    passport = require('passport');

// var AsyncPolling = require('async-polling');

var requireAuth = passport.authenticate('jwt', { session: false }),
    requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/people', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all people');
        var query = buildQuery(req.query, Person.find())
        query
            .select('lastName firstName fullName nickName institutionId personStatus email phone mobile roles country region')
            .populate({ path: 'institutionId', model: 'Institution', select: 'name' })
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No users" });
                }
            });
    }));

    router.get('/people/small', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all people small');
        var query = buildQuery(req.query, Person.find())
        query
            .select('lastName firstName fullName')
            .populate({ path: 'institutionId', model: 'Institution', select: 'name' })
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No users" });
                }
            })
    }));

    router.get('/people/bulkEmail', asyncHandler(async (req, res) => {
        logger.log('info', 'Get people builkEmail');
        var query = buildQuery(req.query, Person.find());
        query.select('lastName firstName institutionId fullName personStatus email phone roles')
        query.populate('institutionId', { institutionStatus: 1, institutionType: 1, memberType: 1, name: 1, region: 1, city: 1, country: 1 })
        query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/people/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get person [%s]', req.params.id, 'verbose');
        await Person.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/uccStaff/:uccRoles', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting UCC Staff');
        let roles = req.params.uccRoles.split(':');
        Person.find({ roles: { $in: roles } })
            .select('lastName firstName fullName')
            .exec().then(people => {
                res.status(200).json(people);
            })
    }));

    router.get('/people/checkEmail/:email', asyncHandler(async (req, res) => {
        logger.log('info', 'Get person for email =' + req.params.email);
        var value = req.params.email.toLowerCase();

        var query = Person.findOne({ email: { $regex: new RegExp('^' + value, 'i') } });
        query.exec().then(object => {
            if (object) {
                res.status(200).json(object);
            } else {
                res.status(404).json({ status: 'available' });
            }
        });
    }));

    router.get('/people/checkName', asyncHandler(async (req, res) => {
        var query = buildQuery(req.query, Model.find())
        query.exec().then(object => {
            if (object.length) {
                res.status(409).json({ status: 'exists' });
            } else {
                res.status(200).json({ status: 'available' });
            }
        });
    }));

    router.post('/people', asyncHandler(async (req, res) => {
        logger.log('info', 'Create Person');
        var person = new Person(req.body);
        person.save().then(result => {
            res.status(200).json(result);
        })
    }));

    router.put('/people', asyncHandler(async (req, res) => {
        logger.log('info', 'Update Person ' + req.body._id);
        await Person.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false }).then(result => {
            Person.findById(result._id)
            .populate({ path: 'institutionId', model: 'Institution', select: 'name' })
            .exec()
            .then(object => {
                if (object) {                   
                    res.status(200).json(object);
                } else {
                    res.status(404).json({ message: "No users" });
                }
            });
        })
    }));

    router.put('/people/password/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Update Person password [%s]', req.params.id);
        await Person.findById(req.params.id).then(result => {
            result.password = req.body.password;
            result.save(function (err, person) {
                if (err) {
                    return next(err);
                } else {
                    res.status(200).json(person);
                }
            });
        })
    }));

    router.delete('/people/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Delete person [%s]', req.params.id, 'verbose');
        await Person.remove({ _id: req.params.id }).then(result => {
            res.status(200).json({ msg: "Person Deleted" });
        })
    }));

    router.route('/users/login')
        .post(requireLogin, login);

    router.route('/users/logout').post(function (req, res, next) {
        logger.log('info', 'logoff-' + req.body.email, 'info');
        res.status(201).json({ message: "logout successful" });
    })

    router.get('/courses', asyncHandler(async (req, res) => {
        logger.log('info', 'Get courses');
        var query = buildQuery(req.query, Course.find());
        query.select('name number')
        query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/courses', asyncHandler(async (req, res) => {
        logger.log('info', 'Create Course');
        var course = new Course(req.body);
        course.save().then(result => {
            res.status(200).json(result);
        })
    }));

    router.put('/courses', asyncHandler(async (req, res) => {
        logger.log('info', 'Update course');
        Course.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false }).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/people/files/:id', function (req, res, next) {
        Person.findById(req.params.id, function (err, person) {
            if (!person) {
                res.status(404).json({ message: 'person not found' });
            }

            const formidable = require('formidable');
            const form = formidable();
            form.maxFileSize = 800 * 1024 * 1024;
            form.parse(req);
            form.on('fileBegin', function (name, file) {
                let fileParts = file.name.split('.');
                let filename = req.params.id + '.' + fileParts[fileParts.length - 1];
                file.path = config.uploads + '/photos/' + filename;
                person.file = {
                    fileName: filename
                }
            });

            form.on('file', function (name, file) {

            });

            form.on('end', function () {
                console.log(person)
                person.save().then(result => {
                    console.log(result)
                    res.status(201).json({ message: 'file uploaded' });
                })
            })
        });
    });

    router.get('/reminder', asyncHandler(async (req, res) => {
        logger.log('info', 'Get reminder');
        var query = buildQuery(req.query, Reminder.find())
        query.exec().then(object => {
            res.status(200).json(object);
        })
    }));

    router.get('/reminder/all/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get reminder');
        var query = Reminder.find({ $or: [{personId: req.params.id}, {personal: false}]});
        query.exec().then(object => {
            res.status(200).json(object);
        })
    }));

    router.get('/reminder/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get reminder ' + req.params.id);
        var query = Reminder.findById(req.params.id)
        query.exec().then(object => {
            res.status(200).json(object);
        })
    }));

    router.post('/reminder/', asyncHandler(async (req, res) => {
        logger.log('info', 'Create reminder');
        let reminder = new Reminder(req.body);
        reminder.save().then(result => {
            res.status(200).json(result);
        })
    }));

    router.put('/reminder', asyncHandler(async (req, res) => {
        logger.log('info', 'Update reminder ' + req.body._id);
        Reminder.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false, new: true })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/reminder/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Delete reminder [%s]', req.params.id);
        await Reminder.remove({ _id: req.params.id }).then(result => {
            res.status(200).json({ msg: "Reminder Deleted" });
        })
    }));
};