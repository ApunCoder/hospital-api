const mongoose = require('mongoose');


//connection string to connect from db
mongoose.connect('mongodb+srv://hellonikhil570:nikk007@cluster0.t0rjj3x.mongodb.net/', { useNewUrlParser: true ,useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to db"));

db.once('open', function () {
    console.log("Successfully connected to database");
});