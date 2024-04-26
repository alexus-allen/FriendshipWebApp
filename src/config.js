const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/test");

//Check if database is connected or not
connect.then(() => {
    console.log("Database connected Successfully");
})
    .catch(() => {
        console.log("Database cannot be connected");
    });

// Create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    quizAnswerList: [Number],
    matchList: [{ first: String, second: Number }],
    friendList: [String]
});

// Collection
const collection = new mongoose.model("user_tuts", LoginSchema);

module.exports = collection;