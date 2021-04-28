// team.js -- team builder specific API routes.

const router = require('express').Router();
const { secret } = require('./user');
const { ObjectId } = require('mongoose');
const jwt = require('jwt-simple');
const Team = require('../models/team');
const User = require('../models/user');

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
                res.status(400).send({ 'message': `Error: ${err}` });
                return;
            }
            Team.findOne({ user: user }, async (err, team) => {
                if (err) {
                    res.status(400).send({ 'message': `Error: ${err}` });
                }
                else if (team) {
                    res.status(200).send(team);
                }
                else {
                    // the UI should be able to deal with this by rendering blank cards, when the user clicks on one, the modal should 
                    // appear to get them to choose a mon.
                    let newTeam = new Team({});
                    newTeam.User = user;
                    // await newTeam.save();
                    res.status(201).send(newTeam);
                }
            });
        });
    }
})



module.exports = router;