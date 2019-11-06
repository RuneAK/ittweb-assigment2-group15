'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  title: {
      type: String,
      required: true,
  },
  user: {type: Schema.ObjectId, ref: 'User'},
  exercises: [{
      name: {
          type: String,
          required: true
      },
      description: {
        type: String,
        required: true
      },
      set: {
          type: Number,
          required: true
      },
      reps_time: {
          type: Number,
          required: true
      }
  }]
});

const Workout = mongoose.model('Workout', WorkoutSchema);

// Methods

exports.createWorkout = async function(req, res){
    var workout = new Workout({
        title: req.body.title,
        user: req.user._id,
        excercises: []
    });
    await workout.save(function (err){
        if (err){
            console.log(`Error: ${err}`);
            return res.status(400).json({
                message: 'Something is not right',
            });
        }
        res.status(200).json({
            message: 'Success'
        });
    })
}

mongoose.model('Workout', WorkoutSchema);