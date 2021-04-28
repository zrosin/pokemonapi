// Schemas for dealing with a Pokemon and related data about a Pokemon.

const { Mongoose, Schema } = require("mongoose");
const mongoose = require("../db");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const pokemonSchema = new mongoose.Schema({
    pokedexNumber: {type: Number, required: true, unique: true},
    name: {type: String, index: true},
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
    hiddenAbility: {type: String},
    image: {type: Buffer}
});

// imgurl shouldn't be persisted to the database (what if the route ever changed? That'd be a pain!) so a virtual property is used.
// https://mongoosejs.com/docs/guide.html#virtuals
pokemonSchema.virtual('imgurl').get(function () {return `/api/pokemon/img/${this.pokedexNumber}`});

// plugin to improve text searching in mongoose.
pokemonSchema.plugin(mongoose_fuzzy_searching, { fields: ['name'], minSize: 4});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// the collection that stores what moves each pokemon can do. 
// each record has a pokedex number (which equals what pokemon can use this move),
// a move id (corresponding to the id attribute in the Move schema), and 
// learnedVia (how they can get the move)
// and the minimum level (which we don't use for anything, but would be helpful to a end user maybe).
const moveSetSchema = new mongoose.Schema({
    pokedexNumber: {type: Number},
    moveId: {type: Number},
    learnedVia: {type: String},
    level: {type: Number},
    move: {type: Schema.Types.ObjectId, ref: "Move"}
})

const MoveSet = mongoose.model('MoveSet', moveSetSchema);

// the collection that stores a move. of interest are:
// id == arbitrary integer for tracking unique moves. we don't use a objectID since that is random.
// damageClass: one of "physical", "status", "special".
// flavorText: a description of a move.

const moveSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    name: {type: String},
    type: {type: String}, 
    power: {type: Number, max: 250},
    pp: {type: Number},
    accuracy: {type: Number},
    damageClass: {type: String},
    flavorText: {type: String},
})

const Move = mongoose.model('Move', moveSchema);

// Collection for containing ability metadata.
// generation == the game generation it was first introduced.

const abilitySchema = new mongoose.Schema({
    name: {type: String},
    generation: {type: Number, max: 8, min: 1},
    flavorText: {type: String}
});


const Ability = new mongoose.model('Ability', abilitySchema);

module.exports = {Pokemon, Move, MoveSet, Ability}
