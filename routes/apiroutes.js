var db = require("../models");

module.exports = function(app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                console.log("workout = " + workout);
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", async(req, res) => {
        try {
            const response = await db.Workout.create({ type: "workout" })
            res.json(response);
        } catch (err) {
            console.log("error occurred creating a workout: ", err)
        }
    })

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        const workoutId = params.id;
        let savedExercises = [];

        db.Workout.find({ _id: workoutId })
            .then(dbWorkout => {
                console.log("app.put " + typeof dbWorkout[0].totalDuration, dbWorkout, Object.keys(dbWorkout));
                let duration = dbWorkout[0].totalDuration + body.duration;
                // console.log("app.put " + duration);
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                updateWorkout(allExercises)
                updateWorkoutDuration(duration)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises) {
            db.Workout.findByIdAndUpdate(workoutId, { exercises: exercises }, function(err, doc) {
                if (err) {
                    console.log(err)
                }

            })
        }

        function updateWorkoutDuration(totalDuration) {
            db.Workout.findByIdAndUpdate(workoutId, { totalDuration }, function(err, doc) {
                if (err) {
                    console.log(err)
                }

            })
        }

    })

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });
};