'use strict';

const mongoose = require( 'mongoose' );
var devMode = true;

try {
    var dbURI = process.env.DEV_MONGODB;
    devMode = false;
    mongoose.connect(dbURI);
} catch {
    var dbURI = 'mongodb://localhost/FitnessApp';
    devMode = true;
    mongoose.connect(dbURI);
}

mongoose.connection.on('connected', () => {
    if (devMode) {
        console.log(`Mongoose connected to ${dbURI}`);
    } else {
        console.log(`Mongoose connected!`);
    }
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through
        ${msg}`);
        callback();
    });
};

const handleError = (err) => {
    console.log(`Error: ${err}`);
    return done(err);
};