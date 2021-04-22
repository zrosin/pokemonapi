const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();


// setup middleware.
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test' }));
app.use(express.json());

// API routes
app.use("/", express.static("static"));

// CORS is only enabled for API routes. There isn't a good reason why one would need to grab our static assets from another origin.
app.use("/api/pokemon", cors(), require("./api/pokemon"));

app.listen(8000, () => console.log("Pokémon API is listening on port 8000!"));

module.exports = app