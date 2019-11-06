'use strict';

// Module dependencies
const User = require('../models/user');
const mongoose = require('mongoose');

exports.register = async function (req, res) {
    try {
        User.createUser(req, res);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            message: 'Something is not right',
        });
    }
};

exports.logout = async function (req, res) {
    req.logout();
};