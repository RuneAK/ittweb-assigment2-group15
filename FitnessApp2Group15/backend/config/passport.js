'use strict';

// Module dependencies

const mongoose = require('mongoose');
const User = mongoose.model('User');
const local = require('./passport/local');

module.exports = function(passport) {
    passport.serializeUser((user, callback) =>
        callback(null, user.email));

    passport.deserializeUser((email, callback) =>
        User.findOne({ email: email }, function(err, user){
            if (err) { return callback(err); }
            callback(null, user);
        }));

    passport.use(local);
};