'use strict';

// Module dependencies

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// User schema
const UserSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, unique: true, required: true, default: '' },
    hashedPassword: { type: String, required: true, default: '' }
});


// Methods
const User = mongoose.model('User', UserSchema);

// TODO: When saving goes well, just redirect to /login with user info.
exports.createUser = async function(req, res){
    var user;
    await bcrypt.hash(req.body.password, 10).then(async function(hash){
        user = new User({
            email: req.body.email,
            name: req.body.name,
            hashedPassword: hash
        })}
        .catch(console.error).then(() => console.log('Hashing failed'))
    );

    try{
        await user.save();
    } catch (err){
        throw new Error();
    }
};

exports.findUser = async function(email) {
    return await User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        else return user;
});
}

exports.findUserById = async function(id) {
    return await User.findUserById({ id: id }, function (err, user) {
        if (err) { return done(err); }
        else return user;
    })
}

// Validate password
exports.validatePassword = async function(user, password) {
    console.log(`hash ${user.hashedPassword}`)
    return await bcrypt.compare(password, user.hashedPassword).then(function (res){
        if (res) {
            console.log('Valid password')
            return true;
        } else {
            console.log('Invalid password')
            return false;
        }
    });
}

mongoose.model('User', UserSchema);