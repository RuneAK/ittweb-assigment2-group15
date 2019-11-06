'use strict';

// Module dependencies

const mongoose = require('mongoose');
const passportJWT = require('passport-jwt');
const JWT = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// package.name should be an environment variable instead
module.exports = new JWT({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hemmelige_hest'
},
async function(jwtPayload, done){
    const user = await User.findUserById(jwtPayload.id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
);