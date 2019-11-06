'use strict';

// Module dependencies

const mongoose = require('mongoose');
const Local = require('passport-local').Strategy;
const User = require('../../models/user');

module.exports = new Local({
    usernameField: 'email',
},
async function(email, password, done){
    const user = await User.findUser(email);
        if (!user) {
            return done(null, false, { message: 'Invalid user' });
        }
        if (!await User.validatePassword(user, password)){
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user, { message: 'Login success' });
    }
);