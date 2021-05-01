// API routes go here.
const { Pokemon, Ability, Move, MoveSet } = require('../models/pokemon');
const router = require('express').Router();
const NUMBER_OF_POKEMON_IN_PAGE = 40;

// Get all pokemon
// http://localhost:8000/api/pokemon
router.get("/", function(req, res) {
    Pokemon.find({},{ image:0 }).sort({pokedexNumber: "ascending"}).exec( function(err, pokemon) {
        if (err) {
            console.log(err);
            res.status(400).json({'message': `error: ${err}`});
        }
        else if (pokemon.length) {
            res.status(200).json(pokemon);
        }
        else {
            res.status(404).json({'message': "There are no Pokémon in the database!"}); 
        }
    });
});

router.get('/names/', function(req, res) {
    Pokemon.find({}, { _id:1, name:1}, { sort: {name: 1} }, function(err, pokemon) {
        if (err) {
            console.log(err);
            res.status(400).json({'message': `error: ${err}`});
        }
        else if (pokemon.length) {
            res.status(200).json({ 'pokemon' : pokemon});
        }
        else {
            res.status(404).json({'message': "There are no Pokémon in the database!"}); 
        }
    });
});


 
// Get all pokemon in pages, with only relevant info for a title card
// http://localhost:8000/api/pokemon/small/:page
router.get('/small/:page', function(req, res) {
    Pokemon.find({}, { _id:0, name:1, pokedexNumber:1, imgurl:1 }, { sort: {pokedexNumber: 1}, skip: (NUMBER_OF_POKEMON_IN_PAGE * (req.params.page - 1)), limit: NUMBER_OF_POKEMON_IN_PAGE }, function(err, pokemon) {
        if (err) {
            console.log(err);
            res.status(400).json({'message': `error: ${err}`});
        }
        else if (pokemon.length) {
            res.status(200).json({  'pages' : 23,
                                    'page' : req.params.page,
                                    'pokemon' : pokemon});
        }
        else {
            res.status(404).json({'message': "There are no Pokémon in the database!"}); 
        }
    });
});

router.get('/small/query/:query/', function(req, res) {
    Pokemon.fuzzySearch(req.params.query).select({ _id:0, name:1, pokedexNumber:1, imgurl:1 }).limit(40).skip(0).exec( function(err, pokemon) {
        if (err) {
                console.log(err);
                res.status(400).json({'message': `error: ${err}`});
            }
            else if (pokemon.length) {
                res.status(200).json({  'pages' : Math.ceil(pokemon.length / NUMBER_OF_POKEMON_IN_PAGE),
                                        'page' : req.params.page,
                                        'pokemon' : pokemon});
            }
            else {
                res.status(404).json({'message': "No Pokemon found!"}); 
            }
        });
    });

// Return number of possible pages of pokemon.
// http://localhost:8000/api/pokemon/pages
router.get('/pages', function(req, res) {
    Pokemon.count({}, function(err, count) {
        if (err) {
            res.status(400).json({'message': `error: ${err}`});
        }
        else if (count) {
            res.status(200).json({'pages' :`${Math.ceil(count / NUMBER_OF_POKEMON_IN_PAGE)}`});
        }
        else {
            res.status(404).json({'message': "There are no Pokémon in the database!"}); 
        }
    });
});

// Get pokemon with given ID
// http://localhost:8000/api/pokemon/id/6063cdb5f0af1b48c8a5218d
router.get('/id/:id', function(req, res) {
    //console.log('id = ' + req.params.id);
    Pokemon.findOne( { _id: req.params.id }, { image:0 }, function(err, pokemon) {
        if (err) {
            res.status(400).json({'message': `error: ${err}`});
        }
        else if (pokemon) {
            res.status(200).json(pokemon);
        }
        else {
            res.status(404).json({'message': `Couldn't find Pokemon with ID: ${req.params.id}`});
        }
    });
});


// Get pokemon by pokedex number
// http://localhost:8000/api/pokemon/pokedex/2
router.get('/pokedex/:pokedex', function(req, res) {
    Pokemon.findOne({ pokedexNumber: { $eq:  req.params.pokedex} } , {  image:0 } , function(err, pokemon) {
        if (err) {
            console.log(err);
            res.status(400).json({'message': `error: ${err}`});
        }
        else if (pokemon) {
            res.status(200).json(pokemon);
        }
        else {
            res.status(404).json({pokemon, 'message': 'Did not find Pokemon with Pokedex Number ' + req.params.pokedex}); 
        }
    });
});

// Get image for a Pokemon by its Pokedex number.
// http://localhost:8000/api/pokemon/img/2
router.get('/img/:pokedex', function(req, res) {
    Pokemon.findOne({ pokedexNumber: { $eq:  req.params.pokedex} } , function(err, pokemon) {
        if (err) {
            console.log(err);
            res.status(400).json({'message': `error: ${err}`});
        }
        else if (pokemon) {
            res.contentType('image/png');
            res.status(200).send(pokemon.image);
        }
        else {
            res.status(404).json({pokemon, 'message': 'Did not find Pokemon with Pokedex Number ' + req.params.pokedex}); 
        }
    });
});

// Get all pokemon with given types
// http://localhost:8000/api/pokemon/type/grass
// http://localhost:8000/api/pokemon/type/grass%2Cpoison
router.get('/type/:types', function(req, res) {
    
    // if we were provided two types, we need to look for pokemon with both of them.
    if(req.params.types.split(',').length === 2) {
        req.params.types = req.params.types.split(',')
    }
    Pokemon.find({ types: { $in: [req.params.types] } } , {  image:0 } , function(err, pokemon) {
        if (err) {
            console.log(err);
            res.status(400).json({'message': `error: ${err}`});
        }
        else if (pokemon.length) {
            res.status(200).json(pokemon);
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
                res.status(400).send({'message': `error: ${err}`});
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
                res.status(400).send({'message': `error: ${err}`});
            }
            else if (result.n === 0) {
                res.status(404).json({ message: 'Pokemon not found' });
            }
            else {
                res.sendStatus(200);
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
        res.status(404).json({ message: 'Pokemon ID is missing' });
        return next();
    }
 
    // Delete this pokemon
    Pokemon.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.status(400).send({'message': `error: ${err}`});
        }
        else if (result.n === 0) {
            res.status(404).json({ message: 'Pokemon not found' });
        }
        else {
            res.sendStatus(204);
        }
    });
});

// Watch out for dragons! The following routes aren't covered by unit tests.

// Get a move by its id
// http://localhost:8000/api/pokemon/move/1

router.get('/move/:id', (req, res) => {
    Move.findOne({ id: { $eq:  req.params.id} }, (err, move) => {
        if(err) {
            console.log(err);
            res.status(400).json({'message': `error: ${err}`});
        }
        else if(move) {
            res.status(200).json(move)
        }
        else {
            res.status(404).json({'message': `Move not found!`});
        }
    })
});

// Get an ability by its name
// http://localhost:8000/api/pokemon/ability/Competitive
router.get('/ability/:name', (req, res) => {
    Ability.findOne({name: {$eq: req.params.name } }, (err, ability) => {
            if(err) {
                console.log(err);
                res.status(400).json({'message': `error: ${err}`});
            }
            else if(ability) {
                res.status(200).json(ability)
            }
            else {
                res.status(404).json({'message': `Ability not found!`});
            }
    })
});

// get the moveset for a Pokémon based on its Pokédex ID.
// http://localhost:8000/api/pokemon/moveset/5
router.get('/moveset/:dexNum', (req, res) => {
    MoveSet.find({pokedexNumber: {$eq: req.params.dexNum } }).populate('move').sort({level: 'ascending'}).exec( (err, moveset) => {
            if(err) {
                console.log(err);
                res.status(400).json({'message': `error: ${err}`});
            }
            else if(moveset.length) {
                res.status(200).json(moveset);
            }
            else {
                res.status(404).json({'message': `No moves were found for this Pokémon!`});
            }
    })
});

module.exports = router
