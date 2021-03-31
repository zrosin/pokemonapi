// API code goes here 
const Pokemon = require('../models/pokemon');
const router = require('express').Router();

// Get all pokemon
// http://localhost:8000/api/pokemon/
router.get("/", function(req, res) {
    Pokemon.find(function(err, pokemon) {
       if (err) {
          res.status(400).send(err);
       }
       else {
          res.json(pokemon);
       }
    });
 });

// Get pokemon with given ID
// http://localhost:8000/api/pokemon/id/6063cdb5f0af1b48c8a5218d
router.get('/id/:id', function(req, res) {
    //console.log('id = ' + req.params.id);
    Pokemon.findById(req.params.id, function(err, pokemon) {
        if (err) {
            res.status(400).send(err);
        }
        else if (pokemon) {
            res.json(pokemon);
        }
        else {
            res.sendStatus(404);
        }
    });
});

// Get all pokemon with given type
// http://localhost:8000/api/pokemon/type/grass
router.get('/type/:types', function(req, res) {
    //console.log('types = ' + req.params.types);
    //console.log('{ types: {  $in: [' + req.params.types + '] } } }');
    
    Pokemon.find({ types: { $in: [req.params.types] } } , function(err, pokemon) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        else if (pokemon) {
            res.json(pokemon);
        }
        else {
            res.sendStatus(404);
        }
    });
});

//Untested
// Add new pokemon
router.post('/', function(req, res) {
 
    // Create a new pokemon from JSON request body
    const pokemon = new Pokemon({
        pokedexNumber: req.body.pokedex,
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        types: req.body.types,
        abilities: req.body.abilities
    });
 
    // Save pokemon and return it as JSON
    pokemon.save(function(err, poke) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(201).json(poke);
        }
    });
});


module.exports = router

