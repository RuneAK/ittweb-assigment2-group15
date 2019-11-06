'use strict';

// Module dependencies
const User = require('../models/user');
const mongoose = require('mongoose');

exports.register = async function (req, res) {
    try {
        await User.createUser(req, res);
    }
    catch (err) {
        console.log('Error when registering user.');
        return res.status(400).json({
            message: 'Error when registering user.',
        });
    }

    return res.status(200).json({
        message: 'Success'
    });
};

exports.logout = async function (req, res) {
    req.logout();
};