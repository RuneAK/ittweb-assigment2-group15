'use strict';

// Module dependencies
const jwt = require('jsonwebtoken');
const passport = require('passport');
const users = require('../controllers/users');

module.exports = function(app, passport) {
    // User routes
    app.post('/user/login', function (req, res, next) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }

            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
            })

            // package.name should be an environment variable instead
            const token = jwt.sign(user, 'hemmelige_hest');
            return res.json({ user, token });
        })
    });
    app.post('/user/register', users.register)
    app.get('/user/logout', users.logout)

    // Workout routes
    app.post('/workout/create', passport.authenticate('jwt', { session: false}), (err) => {
        if (err) {
            return res.status(400).json({
                message: 'Something is not right'
            });
        }
    });
}