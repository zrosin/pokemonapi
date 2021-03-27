// File for managing database connection.

const mongoose = require("mongoose");

mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/pokemondb", {useNewUrlParser: true});

module.exports = mongoose