// File for managing database connection.

const mongoose = require("mongoose");

// .sets are for resolving depreciation warnings. We aren't doing anything that complex anyway...
// https://mongoosejs.com/docs/deprecations.html
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING ? process.env.MONGO_CONNECTION_STRING : "mongodb://localhost/pokemondb";
mongoose.set("useUnifiedTopology", true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoConnectionString, {useNewUrlParser: true});

module.exports = mongoose