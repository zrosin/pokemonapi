// API code goes here 
const Pokemon = require('../models/pokemon');
const router = require('express').Router();

// Get all pokemon
// http://localhost:8000/api/pokemon/
router.get("/", function(req, res) {
    Pokemon.find(function(err, pokemon) {
       if (err) {
          res.status(400).json({'message': 'No Pokemon found'}); 
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
            res.status(404).json({'message': `error: ${err}`});
        }
        else if (pokemon) {
            res.json(pokemon);
        }
        else {
            res.status(404).json({'message': `Couldn't find Pokemon with ID: ${req.params.id}`});
        }
    });
});


// Get pokemon by pokedex number
// http://localhost:8000/api/pokemon/pokedex/2
router.get('/pokedex/:pokedex', function(req, res) {
    Pokemon.findOne({ pokedexNumber: { $eq:  req.params.pokedex} } , function(err, pokemon) {
        if (err) {
            console.log(err);
            res.status(404).json({'message': `error: ${err}`});
        }
        else if (pokemon) {
            res.json(pokemon);
        }
        else {
            res.status(404).json({pokemon, 'message': 'Did not find Pokemon with Pokedex Number ' + req.params.pokedex}); 
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
            res.status(400).json({'message': `error: ${err}`});
        }
        else if (pokemon.length) {
            res.json(pokemon);
        }
        else {
            res.status(404).json({pokemon, 'message': 'Did not find Pokemon with type ' + req.params.types}); 
        }
    });
});

// Add new pokemon
// http://localhost:8000/api/pokemon/   
// POST a JSON with Content-Type: application/json
router.post('/', function(req, res) {
    if(req.body.pokedexNumber !== null && req.body.pokedexNumber > 0 && !isNaN(req.body.pokedexNumber)){
        // Create a new pokemon from JSON request body
        const pokemon = new Pokemon({
            pokedexNumber: req.body.pokedexNumber,
            name: req.body.name,
            height: req.body.height,
            weight: req.body.weight,
            types: req.body.types,
            abilities: req.body.abilities
        });
    
        // Save pokemon and return it as JSON
        pokemon.save(function(err, pokemon) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.status(201).json(pokemon);
            }
        });
    }
    else {
        res.status(404).json({'message': 'Incorrectly formatted pokemon'});
    }
});

// Update existing pokemon
// http://localhost:8000/api/pokemon/id/6063cdb5f0af1b48c8a5218d
router.put('/id/:id', function(req, res) {
    if(req.body.pokedexNumber !== null){
        // Update the student with values from the request
        Pokemon.updateOne({ _id: req.params.id }, req.body, function(err, result) {
            if (err) {
                res.status(400).send(err);
            }
            else if (result.n === 0) {
                res.status(404).json({ message: 'Pokemon not found' });
            }
            else {
                res.sendStatus(204);
            }
        });
    }
    else {
        res.status(404).json({ message: 'Pokedex Number is a required field' });
    }
});


// Delete existing pokemon with the given ID in the URL
// http://localhost:8000/api/pokemon/id/6063cdb5f0af1b48c8a5218d
router.delete('/id/:id', function(req, res) {
 
    // Make sure the pokemon ID was sent
    if (req.params.id === undefined) {
        res.status(400).json({ message: 'Pokemon ID is missing' });
        return next();
    }
 
    // Delete this pokemon
    Pokemon.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else if (result.n === 0) {
            res.status(404).json({ message: 'Pokemon not found' });
        }
        else {
            res.sendStatus(204);
        }
    });
});


module.exports = router

