const Pokemon = require('../models/pokemon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Use should BDD-style syntax
const should = chai.should();   

// Use Chai HTTP
chai.use(chaiHttp);


describe('Pokemon API', () => {

    // Initialize database before each test
    beforeEach(async () => { 
        // Clear database
        await Pokemon.deleteMany({});
        
        // Clear array
        testPokemonDocs.length = 0;       

        // Add test students
        for (const p of testPokemon) {
            const pokemon = new Pokemon(p);
            const pokemonDoc = await pokemon.save();
            testPokemonDocs.push(pokemonDoc);
        } 
    });

    const testPokemonDocs = [];
    const testPokemon = [
        {
        "pokedexNumber":1,
        "name":"Bulbasaur",
        "height":0.7,
        "weight":6.9,
        "types":[
            "grass",
            "poison"
        ],
        "abilities":["Overgrow", "Chlorophyll"]
        },
        {
        "pokedexNumber":2,
        "name":"Ivysaur",
        "height":1.0,
        "weight":13.0,
        "types":[
            "grass",
            "poison"
        ],
        "abilities":["Overgrow", "Chlorophyll"]
        },
        {
        "pokedexNumber":3,
        "name":"Venusaur",
        "height":2.0,
        "weight":100.0,
        "types":[
            "grass",
            "poison"
        ],
        "abilities":["Overgrow", "Chlorophyll"]
        },
        {
        "pokedexNumber":4,
        "name":"Charmander",
        "height":0.6,
        "weight":8.5,
        "types":[
            "fire",
            null
        ],
        "abilities":["Blaze", "Solar Power"]
        },
        {
        "pokedexNumber":5,
        "name":"Charmeleon",
        "height":1.1,
        "weight":19.0,
        "types":[
            "fire",
            null
        ],
        "abilities":["Blaze", "Solar Power"]
        },
        {
        "pokedexNumber":6,
        "name":"Charizard",
        "height":1.7,
        "weight":90.5,
        "types":[
            "fire",
            "flying"
        ],
        "abilities":["Blaze", "Solar Power"]
        },
        {
        "pokedexNumber":7,
        "name":"Squirtle",
        "height":0.5,
        "weight":9.0,
        "types":[
            "water",
            null
        ],
        "abilities":["Torrent", "Rain Dish"]
        },
        {
        "pokedexNumber":8,
        "name":"Wartortle",
        "height":1.0,
        "weight":22.5,
        "types":[
            "water",
            null
        ],
        "abilities":["Torrent", "Rain Dish"]
        },
        {
        "pokedexNumber":9,
        "name":"Blastoise",
        "height":1.6,
        "weight":85.5,
        "types":[
            "water",
            null
        ],
        "abilities":["Torrent", "Rain Dish"]
        },
        {
        "pokedexNumber":10,
        "name":"Caterpie",
        "height":0.3,
        "weight":2.9,
        "types":[
            "bug",
            null
        ],
        "abilities":["Shield Dust", "Run Away"]
        }
    ]


    describe('GET /pokemon', () => {
        it('should get all the pokemon', (done) => {
            chai.request(server)
                .get('/api/pokemon')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(10);
                    done();
                });
        });
    });

    describe('GET /:id pokemon', () => {
        it('should get a pokemon by id', (done) => {
            const pokemon = testPokemonDocs[0];
            chai.request(server)
                .get('/api/pokemon/id/' + pokemon._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pokedexNumber').eql(pokemon.pokedexNumber);
                    res.body.should.have.property('name').eql(pokemon.name);
                    res.body.should.have.property('height').eql(pokemon.height);
                    res.body.should.have.property('weight').eql(pokemon.weight);
                    res.body.should.have.property('types').eql(pokemon.types);
                    res.body.should.have.property('_id').eql(pokemon.id.toString());
                    done();
                });
        });
    });
});

