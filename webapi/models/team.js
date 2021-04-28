// team.js -- schema and some logic for the team builder.

const { Mongoose, Schema } = require('mongoose')
const mongoose = require("../db");
const { Pokemon, Move, Ability } = require("./pokemon");

const teamSchema = new mongoose.Schema({
    name: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "Pokemon", required: true },
    pokemon: {
        type: [
            {
                pokemon: { type: Schema.Types.ObjectId, ref: 'Pokemon' },
                move: [{ type: Schema.Types.ObjectId, ref: 'Move' }],
                ability: {type: Schema.Types.ObjectId, ref: 'Ability'}
            }], required: true
    },
});

const Team = new mongoose.model('Team', teamSchema);

module.exports = Team
