const { Pokemon } = require('../models/pokemon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/user');
const { secret } = require('../api/user');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
// Use should BDD-style syntax
const should = chai.should();

// Use Chai HTTP
chai.use(chaiHttp);


describe('Pokemon API', () => {

    // Initialize database before each test
    beforeEach(async () => {
        // Clear database
        await Pokemon.deleteMany({});
        await User.deleteMany({});
        // Clear array
        testPokemonDocs.length = 0;

        // Add test pokemon
        for (const p of testPokemon) {
            const pokemon = new Pokemon(p);
            const pokemonDoc = await pokemon.save();
            testPokemonDocs.push(pokemonDoc);
        }
        // add test user
        const user = new User({ username: "bsmith", password: bcrypt.hashSync('opensesame', 10) });
        await user.save();
    });

    const testPokemonDocs = [];
    const testPokemon = [
        {
            name: 'Bulbasaur',
            height: 7,
            weight: 69,
            baseExperience: 64,
            flavorText: 'A strange seed was ' +
                'planted on its ' +
                'back at birth. The plant sprouts ' +
                'and grows with ' +
                'this POKéMON.',
            pokedexNumber: 1,
            hp: 45,
            attack: 49,
            defense: 49,
            specialAttack: 65,
            specialDefense: 65,
            speed: 45,
            types: ['Grass', 'Poison'],
            abilities: ['Overgrow', null],
            hiddenAbility: 'Chlorophyll'
        },
        {
            name: 'Ivysaur',
            height: 10,
            weight: 130,
            baseExperience: 142,
            flavorText: 'When the bulb on ' +
                'its back grows ' +
                'large, it appears to lose the ' +
                'ability to stand ' +
                'on its hind legs.',
            pokedexNumber: 2,
            hp: 60,
            attack: 62,
            defense: 63,
            specialAttack: 80,
            specialDefense: 80,
            speed: 60,
            types: ['Grass', 'Poison'],
            abilities: ['Overgrow', null],
            hiddenAbility: 'Chlorophyll'
        },
        {
            name: 'Venusaur',
            height: 20,
            weight: 1000,
            baseExperience: 263,
            flavorText: 'The plant blooms ' +
                'when it is ' +
                'absorbing solar energy. It stays ' +
                'on the move to ' +
                'seek sunlight.',
            pokedexNumber: 3,
            hp: 80,
            attack: 82,
            defense: 83,
            specialAttack: 100,
            specialDefense: 100,
            speed: 80,
            types: ['Grass', 'Poison'],
            abilities: ['Overgrow', null],
            hiddenAbility: 'Chlorophyll'
        },
        {
            name: 'Charmander',
            height: 6,
            weight: 85,
            baseExperience: 62,
            flavorText: 'Obviously prefers ' +
                'hot places. When ' +
                'it rains, steam is said to spout ' +
                'from the tip of ' +
                'its tail.',
            pokedexNumber: 4,
            hp: 39,
            attack: 52,
            defense: 43,
            specialAttack: 60,
            specialDefense: 50,
            speed: 65,
            types: ['Fire', null],
            abilities: ['Blaze', null],
            hiddenAbility: 'Solar Power'
        },
        {
            name: 'Charmeleon',
            height: 11,
            weight: 190,
            baseExperience: 142,
            flavorText: 'When it swings ' +
                'its burning tail, ' +
                'it elevates the temperature to ' +
                'unbearably high ' +
                'levels.',
            pokedexNumber: 5,
            hp: 58,
            attack: 64,
            defense: 58,
            specialAttack: 80,
            specialDefense: 65,
            speed: 80,
            types: ['Fire', null],
            abilities: ['Blaze', null],
            hiddenAbility: 'Solar Power'
        },
        {
            name: 'Charizard',
            height: 17,
            weight: 905,
            baseExperience: 267,
            flavorText: 'Spits fire that ' +
                'is hot enough to ' +
                'melt boulders. Known to cause ' +
                'forest fires ' +
                'unintentionally.',
            pokedexNumber: 6,
            hp: 78,
            attack: 84,
            defense: 78,
            specialAttack: 109,
            specialDefense: 85,
            speed: 100,
            types: ['Fire', 'Flying'],
            abilities: ['Blaze', null],
            hiddenAbility: 'Solar Power'
        },
        {
            name: 'Squirtle',
            height: 5,
            weight: 90,
            baseExperience: 63,
            flavorText: 'After birth, its ' +
                'back swells and ' +
                'hardens into a shell. Powerfully ' +
                'sprays foam from ' +
                'its mouth.',
            pokedexNumber: 7,
            hp: 44,
            attack: 48,
            defense: 65,
            specialAttack: 50,
            specialDefense: 64,
            speed: 43,
            types: ['Water', null],
            abilities: ['Torrent', null],
            hiddenAbility: 'Rain Dish'
        },
        {
            name: 'Wartortle',
            height: 10,
            weight: 225,
            baseExperience: 142,
            flavorText: 'Often hides in ' +
                'water to stalk ' +
                'unwary prey. For swimming fast, it ' +
                'moves its ears to ' +
                'maintain balance.',
            pokedexNumber: 8,
            hp: 59,
            attack: 63,
            defense: 80,
            specialAttack: 65,
            specialDefense: 80,
            speed: 58,
            types: ['Water', null],
            abilities: ['Torrent', null],
            hiddenAbility: 'Rain Dish'
        },
        {
            name: 'Blastoise',
            height: 16,
            weight: 855,
            baseExperience: 265,
            flavorText: 'A brutal POKéMON ' +
                'with pressurized ' +
                'water jets on its shell. They are ' +
                'used for high ' +
                'speed tackles.',
            pokedexNumber: 9,
            hp: 79,
            attack: 83,
            defense: 100,
            specialAttack: 85,
            specialDefense: 105,
            speed: 78,
            types: ['Water', null],
            abilities: ['Torrent', null],
            hiddenAbility: 'Rain Dish'
        },
        {
            name: 'Caterpie',
            height: 3,
            weight: 29,
            baseExperience: 39,
            flavorText: 'Its short feet ' +
                'are tipped with ' +
                'suction pads that enable it to ' +
                'tirelessly climb ' +
                'slopes and walls.',
            pokedexNumber: 10,
            hp: 45,
            attack: 30,
            defense: 35,
            specialAttack: 20,
            specialDefense: 20,
            speed: 45,
            types: ['Bug', null],
            abilities: ['Shield Dust', null],
            hiddenAbility: 'Run Away'
        }
    ]
    const bsmithJwt = jwt.encode({username: "bsmith"}, secret);

    describe('GET /pokemon', () => {
        it('should get all the pokemon', (done) => {
            chai.request(server)
                .get('/api/pokemon/')
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                    res.body[0].types[0].should.be.eql("Grass");
                    done();
                });
        });
        it('should return 404 on bad type', (done) => {
            chai.request(server)
                .get('/api/pokemon/type/notatype/')
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(200);

                    chai.request(server)
                        .get('/api/pokemon/id/' + testPokemonDocs[4]._id)
                        .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(200);

                    chai.request(server)
                        .get('/api/pokemon/id/' + testPokemonDocs[4]._id)
                        .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
                .send(pokemon)
                .end((err, res) => {
                    res.should.have.status(404);

                    chai.request(server)
                        .get('/api/pokemon/id/' + testPokemonDocs[6]._id)
                        .set('x-auth', bsmithJwt)
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
                .set('x-auth', bsmithJwt)
                .end((err, res) => {
                    res.should.have.status(204);

                    chai.request(server)
                        .get('/api/pokemon/id/' + pokemon._id)
                        .set('x-auth', bsmithJwt)
                        .end((err, res) => {
                            res.should.have.status(404);
                            done();
                        });
                });
        });
        it('should not delete a pokemon with an invalid id', (done) => {
            chai.request(server)
                .delete('/api/pokemon/id/badid')
                .set('x-auth', bsmithJwt)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});
