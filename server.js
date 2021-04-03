const express = require('express');
const morgan = require('morgan');

const app = express()

// setup middleware.
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test' }));
app.use(express.json());

// API routes
app.use("/", express.static("static"));
app.use("/api/pokemon", require("./api/pokemon"));

app.listen(8000, () => console.log("Pokémon API is listening on port 8000!"));

module.exports = app