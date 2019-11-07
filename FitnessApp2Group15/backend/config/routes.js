'use strict';

// Module dependencies
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = app => {
    // User routes
    app.post('/user/register', (req, res, next) => {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                console.log(err);
                res.status(400).json({ message: err });
            }
            if (info != undefined){
                console.log(info.message);
                res.status(400).json({ message: info.message });
            }
            else {
                req.logIn(user, err => {
                    const data = {
                        name: req.body.name,
                        username: req.body.email,
                    };
                    let email = user.email;
                    User.findOne({ email }).then(user => {
                        user
                            .update({
                                name: data.name,
                                username: data.username,
                            })
                            .then(() => {
                                console.log('User created in database');
                                res.status(200).json({ message: 'Success' });
                            });
                    });
                });
            }
        })(req, res, next);
    });

    app.post('/user/login', (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.log(err);
                res.status(400).json({ message: err });
            }
            if (info != undefined) {
                console.log(info.message);
                res.status(400).json({ message: info.message });
            }
            else {
                req.logIn(user, err => {
                    var email = user.email;
                    User.findOne({ email }).then(user => {
                        const token = jwt.sign({ id: user.email }, 'hemmelige_hest');
                        res.status(200).json({
                            auth: true,
                            token: token,
                            message: 'Success',
                        });
                    });
                });
            }
        })(req, res, next);
    });

    // Workout routes
    app.post('/workout/create', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            }
            else {
                console.log('User was authenticated');
                res.status(200).json({
                    auth: true,
                    message: 'Success',
                });
            }
        })(req, res, next);
    });
};