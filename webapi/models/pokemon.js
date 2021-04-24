// Schema and functions for dealing with a Pokemon.

const mongoose = require("../db");

const PokemonSchema = new mongoose.Schema({
    pokedexNumber: {type: Number, required: true, unique: true},
    name: {type: String},
    height: {type: Number},
    weight: {type: Number},
    types: {type: [String]},
    abilities: {type: [String]},
    flavorText: {type: String},
    baseExperience: {type: Number},
    hp: {type: Number},
    attack: {type: Number},
    defense: {type: Number},
    specialAttack: {type: Number},
    specialDefense: {type: Number},
    speed: {type: Number},
    hiddenAbility: {type: String}
})

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon
