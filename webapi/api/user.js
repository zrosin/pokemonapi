// user.js -- contains user auth specific routes.

const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');

// so if the user wants to use a not hard-coded secret they can, as long as they always run the app with the same secret.
const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "Why Johnny Ringo, you look like somebody just walked over your grave.";

router.post("/create", function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ 'message': 'Make sure to give me a username and a password!' });
        return;
    }
    
    // we need to see if this user already exists, as in /auth we only assume there is a single user with the same username.
    // in real life, we would also need another route to reset a password somehow.
    User.findOne({ username: req.body.username }, async (err, user) => {
        if (err) {
            res.status(400).send({ 'message': `Error: ${err}` });
        }
        else if (user) {
            res.status(400).send({ 'message': 'That username is already in use!' });
        }
        else {
            const newUser = new User({
                username: req.body.username,
                password: (bcrypt.hashSync(req.body.password, 10))
            });
            await newUser.save((err) => {
                if (err) {
                    res.status(400).send({ 'message': `error: ${err}` });
                    return;
                }
                res.sendStatus(201).send({ 'message': `Account ${req.body.username} created!` });
            });
        }
    })
});

router.post("/auth", (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).send({ 'message': 'Make sure to give me a username and a password!' });
        return;
    }
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            res.status(400).send({ 'message': `Error: ${err}` });
        }
        else if (!user) {
            // no user with that name.
            res.status(400).send({ 'message': 'Invalid username or password.' });
        }
        else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.encode({username: user.username}, secret);
                res.status(200).json({token: token});
            }
            else {
                res.status(400).send({ 'message': 'Invalid username or password.' });
            }
        }
    });
});

module.exports = {router, secret};
