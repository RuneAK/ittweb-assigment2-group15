// Module dependencies

const express = require('express');
const passport = require('passport');
const join = require('path').join;
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const API_PORT = process.env.API_PORT || 3000;

// Require all mongoose models
const models = join(__dirname, '/backend/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Setup custom modules here
require('./backend/models/db');
require('./backend/config/passport');

// Server configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(session({ secret: 'hemmelige_hest', resave: false, saveUninitialized: true }))
app.use(passport.initialize());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

require('./backend/config/routes')(app);

app.listen(API_PORT, () => 
  console.log('Listning on 3000'));

module.exports = app;