const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const User = require("./models/workoutModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/exercise', function(req, res) {
    res.sendFile(__dirname + '/public/exercise.html');
});
app.get('/stats', function(req, res) {
    res.sendFile(__dirname + '/public/stats.html');
});

require("./routes/apiroutes")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});