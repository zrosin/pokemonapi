const express = require('express');
const morgan = require('morgan');

const app = express()

// setup middleware.
app.use(morgan('dev'));
app.use(express.json());

// API routes
app.use("/api/pokemon", require("./api/pokemon"));
app.get("/", (req, res) => {
    res.status(200).send("You have an Express app running!");
})

app.listen(8000, () => console.log("Pokémon API is listening on port 8000!"));

module.exports = app