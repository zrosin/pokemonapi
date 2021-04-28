const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const user = require('./api/user');
const jwt = require('jwt-simple');
const app = express();


// setup middleware needed for all routes.
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test' }));
app.use(express.json());

// CORS is only enabled for API routes. There isn't a good reason why one would need to grab our static assets from another origin.
app.use("/api/user/", cors(), user.router);

// For all API routes that aren't user creation/login, authentication is required. There wasn't another great place to put this middleware, so...
app.use("/api/", (req, res, next) => {
    if (!req.headers["x-auth"]) {
        return res.status(401).send({'message': 'X-Auth header is missing. Did you remember your JWT?'});
    }
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token, user.secret);
        next();
    }
    catch {
        return res.status(401).send({'message': 'Invalid JWT.'});
    }
})
app.use("/api/pokemon", cors(), require("./api/pokemon"));
app.use("/api/team", cors(), require("./api/team"));

// static file handling, and ensures React Router is not interfered with.
app.use(express.static("static"));
app.get('*', (req, res) => {                       
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));                               
});

app.listen(8000, () => console.log("Pokémon API is listening on port 8000!"));

module.exports = app