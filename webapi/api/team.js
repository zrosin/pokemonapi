// team.js -- team builder specific API routes.

const router = require('express').Router();
const { secret } = require('./user');
const { ObjectId } = require('mongoose');
const jwt = require('jwt-simple');
const Team = require('../models/team');
const User = require('../models/user');
const { Pokemon } = require('../models/pokemon');

router.get("/", async (req, res) => {
    // Get the user's team. Due to lack of time, the user can only have one team (enforced by this endpoint, it will only ever return one.)
    if (req.headers["x-auth"] === undefined) {
        res.status(401).send({ 'message': `You aren't authenticated. How did you even get here?` });
        return;
    }
    else {
        const username = jwt.decode(req.headers["x-auth"], secret).username;
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                res.status(400).json({ 'message': `Error: ${err}` });
                return;
            }
            Team.findOne({ user: user }, async (err, team) => {
                if (err) {
                    res.status(400).json({ 'message': `Error: ${err}` });
                }
                else if (team) {
                    res.status(200).json(team);
                }
                else {
                    // the UI should be able to deal with this by rendering blank cards, when the user clicks on one, the modal should 
                    // appear to get them to choose a mon.
                    let newTeam = new Team({});
                    newTeam.name = "New Team!"
                    newTeam.User = user;
                    newTeam.comp = [{ pokemon: null, moves: [], ability: null }];
                    await newTeam.save();
                    res.status(201).json(newTeam);
                }
            });
        });
    }
})

router.put("/", (req, res) => {
    // We only need a put route, since a empty team is created on a get to the api route for the user.
    // in your request, you need to send a array (json encoded), of objects (no more than 6), with the following members:
    // pokemon: objectId that goes to a pokemon in the database
    // moves: array of max length 4 of object ids that go to moves in the database (you can gather this info from /api/pokemon/moveset's objects, which are already used in the table anyway)
    // ability: name of ability the pokemon holds. Prose text for abilities is available via /api/pokemon/ability/:name

    if (req.body.length < 1 || req.body.length > 6) {
        res.status(400).json({ "message": `The body array is the wrong length (expected >=1 && < 6, got ${req.body.length}).` })
    }
    if (req.headers["x-auth"] === undefined) {
        res.status(401).json({ 'message': `You aren't authenticated. How did you even get here?` });
        return;
    }
    for (let i = 0; i < req.body.length; i++) {
        if (req.body[i].moves.length < 1 || req.body[i].moves.length > 4) {
            res.status(400).json({ "message": `The moves array for the Pokemon with objectID ${req.body[i].pokemon} is the wrong length (expected >= 1&& < 5, got ${req.body.length}).` });
            return;
        }
        let pokemonArr = req.body.map(i => i.pokemon);
        Pokemon.find({ _id: { $in: pokemonArr } }, (err, pkmn) => {
            if (err) {
                console.log(err);
                res.status(400).json({ 'message': `error: ${err}` });
                return;
            }
            else if (pokemonArr.length !== pkmn.length) {
                const valid = pkmn.map(i => i._id);
                const invalid = pokemonArr.filter(i => (!(valid.includes(i))));
                res.status(400).json({ 'message': `Not all of the Pokemon sent were valid. Invalid Pokemon IDs: ${invalid}` });
                return;
            }
        });

        // we assume moves are right due to them being pulled from the moveset API. and sometimes you want anything goes anyway.
        const username = jwt.decode(req.headers["x-auth"], secret).username;
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                res.status(400).json({ 'message': `Error: ${err}` });
                return;
            }
            Team.updateOne({ User: req.params.id }, { 'comp': req.body }, function (err, result) {
                if (err) {
                    res.status(400).json({ 'message': `error: ${err}` });
                }
                else if (result.n === 0) {
                    res.status(404).json({ 'message': 'Team not found. How did this even happen?' });
                }
                else {
                    res.sendStatus(200);
                }
            });
        });
    }
});

router.get("/analyze", (req, res) => {
    // The endpoint which triggers an analysis.
    // The box on the page needs to take in a array with a list of objects in this form:
    // {'ok/warning/error': 'message'}, where ok/warning/failure determines the coloring of the text on the page, and message is the message.
    // this endpoint will return a fake message until I write the real one later today (god willing).
    if (req.headers["x-auth"] === undefined) {
        res.status(401).send({ 'message': `You aren't authenticated. How did you even get here?` });
        return;
    }
    res.status(418).json([{'ok': 'This is what a ok message looks like.'}, {'warning': 'this is what a warning message looks like'}, {'error': 'this is what an error message looks like.'}]);
    
})



module.exports = router;