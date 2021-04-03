// File for managing database connection.

const mongoose = require("mongoose");

// .sets are for resolving depreciation warnings. We aren't doing anything that complex anyway...
// https://mongoosejs.com/docs/deprecations.html
mongoose.set("useUnifiedTopology", true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/pokemondb", {useNewUrlParser: true});

module.exports = mongoose