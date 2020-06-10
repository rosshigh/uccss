'use strict'

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Person = mongoose.model('Person'),
    // PersonArchive = mongoose.model('PersonArchive'),
    // Note = mongoose.model('Note'),
    // TechNote = mongoose.model('TechNote'),
    // TechNoteCategory = mongoose.model('TechNoteCategory'),
    http = require('http'),
    PasswordReset = mongoose.model('PasswordReset'),
    // path = require('path'),
    logger = require('../../config/logger'),
    // logAuth = require('../../config/log-authenticate'),
    passportService = require('../../config/passport'),
    passport = require('passport');
// Notifications =  mongoose.model('Notification'),
// Event = mongoose.model('Event'),
// EmailLog = mongoose.model('EmailLog'),
// multer = require('multer'),
// mkdirp = require('mkdirp'),
// DuplicateRecordError = require(path.join(__dirname, "../../config", "errors", "DuplicateRecordError.js"));


// var AsyncPolling = require('async-polling');

var requireAuth = passport.authenticate('jwt', { session: false }),
    requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/people').get((req, res, next) => {
        logger.log('info', 'Get all people');
        var query = buildQuery(req.query, Person.find())
        query
            .select('lastName firstName fullName institutionId personStatus email phone roles')
            .populate({ path: 'institutionId', model: 'Institution', select: 'name' })
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No users" });
                }
            }).catch(err => { return next(err); });
    });

    router.route('/users/login')
        .post(requireLogin, login);

    router.route('/users/logout').post(function (req, res, next) {
        logger.log('info', 'logoff-' + req.body.email, 'info');
        res.status(201).json({ message: "logout successful" });
    })

};