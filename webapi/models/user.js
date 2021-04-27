// user.js -- containing the user model.
// some code based on https://sites.harding.edu/fmccown/classes/comp4310-s21/notes/notes32.html

const mongoose = require("../db");

const userSchema = mongoose.Schema({
    username: {type: String, required: true },
    password: {type: String, required: true }
});
const User = mongoose.model("User", userSchema);

module.exports = User;