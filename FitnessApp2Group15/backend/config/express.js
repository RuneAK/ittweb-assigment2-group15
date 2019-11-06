// Module dependencies

const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

module.exports = function(app, passport){
    // Setup database here
    require('../models/db');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({ secret: 'hemmelige_hest', resave: false, saveUninitialized: true }))
    
    // Passport for authentication
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.listen(3000, function() {
        console.log('Listning on 3000');
    });
}