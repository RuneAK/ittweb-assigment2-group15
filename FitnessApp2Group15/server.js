// Module dependencies

const express = require('express');
const passport = require('passport');
const join = require('path').join;
const fs = require('fs');

const app = express();

// Require all mongoose models

const models = join(__dirname, '/backend/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

module.exports = app;

// Bootstrap
require('./backend/config/passport')(passport);
require('./backend/config/express')(app, passport);
require('./backend/config/routes')(app, passport);