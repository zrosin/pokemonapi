// team.js -- schema and some logic for the team builder.

const { Mongoose, Schema } = require('mongoose')
const mongoose = require("../db");
const { Pokemon, Move, Ability } = require("./pokemon");

const teamSchema = new mongoose.Schema({
    name: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    comp: {
        type: [
            {
                pokemon: { type: Schema.Types.ObjectId, ref: 'Pokemon', autopopulate: true },
                moves: [{ type: Schema.Types.ObjectId, ref: 'Move', autopopulate: true}],
                ability: {type: Schema.Types.ObjectId, ref: 'Ability', autopopulate: true}
            }], required: true
    },
});

teamSchema.plugin(require('mongoose-autopopulate'));
const Team = new mongoose.model('Team', teamSchema);

module.exports = Team
