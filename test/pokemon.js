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

        // Add test pokemon
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
                .get('/api/pokemon/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(10);
                    done();
                });
        });
    });

    describe('GET /pokemon/id/:id', () => {
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
                    res.body.should.have.property('abilities').eql(pokemon.abilities);
                    res.body.should.have.property('_id').eql(pokemon._id.toString());
                    done();
                });
        });
        it('should return 400 with a bad id', (done) => {
            chai.request(server)
                .get('/api/pokemon/id/badid/')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        
    });

    describe('GET /pokemon/pokedex/:pokedex', () => {
        it('should get a pokemon by its pokedex number', (done) => {
            const pokemon = testPokemonDocs[5];

            chai.request(server)
                .get('/api/pokemon/pokedex/' + pokemon.pokedexNumber)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pokedexNumber').eql(pokemon.pokedexNumber);
                    res.body.should.have.property('name').eql(pokemon.name);
                    res.body.should.have.property('height').eql(pokemon.height);
                    res.body.should.have.property('weight').eql(pokemon.weight);
                    res.body.should.have.property('types').eql(pokemon.types);
                    res.body.should.have.property('abilities').eql(pokemon.abilities);
                    res.body.should.have.property('_id').eql(pokemon._id.toString());
                    done();
                });
        });
        it('should return 404 with a bad pokedex number', (done) => {
            chai.request(server)
                .get('/api/pokemon/pokedex/11/')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('GET /pokemon/type/:type', () => {
        it('should get pokemon based on type', (done) => {
            const pokemon = testPokemonDocs[1];

            chai.request(server)
                .get('/api/pokemon/type/' + pokemon.types[0])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                    res.body[0].types[0].should.be.eql("grass");
                    done();
                });
        });
        it('should return 404 on bad type', (done) => {
            chai.request(server)
                .get('/api/pokemon/type/notatype/')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.pokemon.should.be.eql([]);
                    done();
                });
        });
    });

    describe('POST /pokemon/', () => {
        it('should create a new pokemon', (done) => {
            const pokemon = testPokemonDocs[9];
            //pokedex numbers are unique
            pokemon.pokedexNumber = 11;

            chai.request(server)
                .post('/api/pokemon/')
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pokedexNumber').eql(pokemon.pokedexNumber);
                    res.body.should.have.property('name').eql(pokemon.name);
                    res.body.should.have.property('height').eql(pokemon.height);
                    res.body.should.have.property('weight').eql(pokemon.weight);
                    res.body.should.have.property('types').eql(pokemon.types);
                    res.body.should.have.property('abilities').eql(pokemon.abilities);
                    done();
                });
        });
        it('should not overwrite a pokemon', (done) => {
            const pokemon = testPokemonDocs[9];

            chai.request(server)
                .post('/api/pokemon/')
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should not accept an incorrectly formatted pokemon', (done) => {
            pokemon = testPokemonDocs[6];
            //pokedex numbers are required
            pokemon.pokedexNumber = null;

            chai.request(server)
                .post('/api/pokemon/')
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('should not accept an incorrectly formatted pokemon', (done) => {
            pokemon = testPokemonDocs[6];
            //pokedex numbers are required
            pokemon.pokedexNumber = -12;

            chai.request(server)
                .post('/api/pokemon/')
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('should not accept an incorrectly formatted pokemon', (done) => {
            pokemon = testPokemonDocs[6];
            //pokedex numbers are required
            pokemon.pokedexNumber = "asdf";

            chai.request(server)
                .post('/api/pokemon/')
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('PUT /pokemon/id/:id', () => {
        it('should update a pokemon', (done) => {
            const pokemon = testPokemonDocs[4];
            pokemon.name = "Chad";
            pokemon.weight = 49.1;
            pokemon.height = 123.456;
            pokemon.types = ["water", "anger"];

            chai.request(server)
                .put('/api/pokemon/id/' + testPokemonDocs[4]._id)
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(200);

                    chai.request(server)
                        .get('/api/pokemon/id/' + testPokemonDocs[4]._id)
                        .end((err, res) => {
                            res.body.should.have.property('pokedexNumber').eql(pokemon.pokedexNumber);
                            res.body.should.have.property('name').eql(pokemon.name);
                            res.body.should.have.property('height').eql(pokemon.height);
                            res.body.should.have.property('weight').eql(pokemon.weight);
                            res.body.should.have.property('types').eql(pokemon.types);
                            res.body.should.have.property('abilities').eql(pokemon.abilities);
                            done();
                        });
                });
        });
        it('should update a pokemon with no changes', (done) => {
            const pokemon = testPokemonDocs[4];

            chai.request(server)
                .put('/api/pokemon/id/' + testPokemonDocs[4]._id)
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(200);

                    chai.request(server)
                        .get('/api/pokemon/id/' + testPokemonDocs[4]._id)
                        .end((err, res) => {
                            res.body.should.have.property('pokedexNumber').eql(pokemon.pokedexNumber);
                            res.body.should.have.property('name').eql(pokemon.name);
                            res.body.should.have.property('height').eql(pokemon.height);
                            res.body.should.have.property('weight').eql(pokemon.weight);
                            res.body.should.have.property('types').eql(pokemon.types);
                            res.body.should.have.property('abilities').eql(pokemon.abilities);
                            done();
                        });
                });
        });
        it('should not update a pokemon with invalid parameters', (done) => {
            const pokemon = testPokemonDocs[6];
            pokemon.pokedexNumber = null;

            chai.request(server)
                .put('/api/pokemon/id/' + testPokemonDocs[6]._id)
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(404);

                    chai.request(server)
                        .get('/api/pokemon/id/' + testPokemonDocs[6]._id)
                        .end((err, res) => {
                            res.body.should.have.property('pokedexNumber').not.eql(pokemon.pokedexNumber);
                            done();
                        });
                });
        });
    });

    describe('DELETE /pokemon/id/:id', () => {
        it('should delete a pokemon', (done) => {
            const pokemon = testPokemonDocs[8];

            chai.request(server)
                .delete('/api/pokemon/id/' + pokemon._id)
                .end((err, res) => {
                    res.should.have.status(204);

                    chai.request(server)
                        .get('/api/pokemon/id/' + pokemon._id)
                        .end((err, res) => {
                            res.should.have.status(404);
                            done();
                        });
                });
        });
        it('should not delete a pokemon with an invalid id', (done) => {
            chai.request(server)
                .delete('/api/pokemon/id/badid')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});
