'use strict';

// Module dependencies
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Workout = mongoose.model('Workout');
const Activity = mongoose.model('Activity');

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
                        const token = jwt.sign({ id: user.email }, 'hemmelige_hest', { expiresIn: '1h' });
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
            console.log('Passport authenticate');
            if (err) {
                console.log(err);
                res.status(400).json({ message: err });
            }
            if (info != undefined) {
                console.log(info.message);
                res.status(400).json({ message: info.message });
            }
            else {
                var workout = new Workout({
                    title: req.body.title,
                    user: user._id,
                    excercises: []
                });
                workout.save(function (err){
                    if (err){
                        console.log('Workout was NOT saved');
                        res.status(400).json({ message: 'Workout was NOT saved' });
                    }
                    else {
                        console.log('Workout was saved');
                        res.status(200).json({ message: 'Workout was saved'});
                    }
                });
            }
        })(req, res, next);
    });

    app.get('/workout/showall', function(req, res) {
        Workout.find({}, function(err, workouts) {
            if (err){
                console.log(err);
                res.status(400).json({ message: err });
            }
            res.status(200).json({ workouts });
        });
    });

    app.get('/workout/show/:id', (req, res) => {
        let _id = mongoose.mongo.ObjectId(req.params.id);
        Workout.findById({_id}, function(err, workout) {
            if (err || !workout){
                console.log('error ' + workout);
                res.status(400).json({ message: 'No workout with that id' });
            }
            else{
                res.status(200).json({ workout });
            }
        });
    });

    app.post('/workout/addExercise/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
                res.status(400).json({ message: err });
            }
            if (info != undefined) {
                console.log(info.message);
                res.status(400).json({ message: info.message });
            }
            else {
                let _id = mongoose.mongo.ObjectId(req.params.id);
                Workout.findById({ _id }, function(err, workout) {
                    if (err || !workout) {
                        console.log('Error finding workout: ' + workout);
                        res.status(400).json({ message: 'No workout with that id' });
                    }
                    else{
                        console.log(workout);
                        workout.exercises.push({ name: req.body.name, description: req.body.description, set: req.body.set, reps_time: req.body.reps_time });
                        console.log(workout);
                        workout.save(function(error) {
                            if (error){
                                console.log('Saving error');
                                res.status(400).json({ message: 'Saving error' });
                            }
                            else
                            {
                                console.log('Saved');
                                res.status(200).json({ message: 'Success' });
                            }
                        });
                    }
                });
            }
        })(req, res, next);
    });

    app.get('/activity/show', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
                res.status(400).json({ message: err });
            }
            if (info != undefined) {
                console.log(info.message);
                res.status(400).json({ message: info.message });
            }
            else {
                let _id = mongoose.mongo.ObjectId(user._id);
                Activity.findById({ _id }, function(err, activity) {
                    if (err || !activity){
                        console.log('No activities for that user');
                        res.status(400).json({ message: 'No activities for that user' });
                    }
                    else {
                        console.log('Activities found for user');
                        res.status(200).json({ activity });
                    }
                });
            }
        })(req, res, next);
    });

    app.post('/activity/add', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            console.log('About to authentication for /activity/add')
            if (err) {
                console.log(err);
                res.status(400).json({ message: err });
            }
            if (info != undefined) {
                console.log(info.message);
                res.status(400).json({ message: info.message });
            }
            else {
                console.log(req.body);
                let _id = mongoose.mongo.ObjectId(req.body.workout);
                console.log('Parsed id: ' + _id);
                Workout.findById({ _id }, function(err, workout) {
                    if (err ) {
                        console.log('Error in workout.findById');
                        res.status(400).json({ message: 'No workout with that id' });
                    }
                    else{
                        console.log(workout);
                        var activity = new Activity({
                            date: req.body.date,
                            comment: req.body.comment,
                            user: user._id,
                            workout: workout._id,
                        });
                        activity.save(function (err) {
                            if (err){
                                console.log('Could not add activity');
                                res.status(400).json({ message: 'Could not add activity' });
                            }
                            else{
                                console.log('Activity added');
                                res.status(200).json({ message: 'Activity added' });
                            }
                        });
                    }                
                });
            }
        })(req, res, next);
    });
};