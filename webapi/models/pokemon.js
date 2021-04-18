const mongoose = require("../db");

const PokemonSchema = new mongoose.Schema({
    pokedexNumber: {type: Number, required: true, unique: true},
    name: {type: String},
    height: {type: Number},
    weight: {type: Number},
    types: {type: [String]},
    abilities: {type: [String]}
})

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon
