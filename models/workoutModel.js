const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Type is Required"
        },
        name: {
            type: String,
            trim: true,
            required: "Name is Required"
        },
        duration: {
            type: Number,
            trim: true,
            required: "Duration is Required"
        },
        weight: {
            type: Number,
            trim: true,
            required: "Weight is Required"
        },
        reps: {
            type: Number,
            trim: true,
            required: "Reps is Required"
        },
        sets: {
            type: Number,
            trim: true,
            required: "Sets is Required"
        }
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;