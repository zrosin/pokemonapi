// team.js -- schema and some logic for the team builder.

const { Mongoose, Schema } = require('mongoose')
const mongoose = require("../db");
const { Pokemon, Move, Ability } = require("./pokemon");

const TeamEffectiveness = new mongoose.model('TeamEffectiveness', new mongoose.Schema({
    damageType: {type: String},
    targetType: {type: String},
    damageFactor: {type: Number}
}));


const teamSchema = new mongoose.Schema({
    name: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "user"},
    comp: {
        type: [
            {
                pokemon: { type: Schema.Types.ObjectId, ref: 'Pokemon', autopopulate: true },
                moves: [{ type: Schema.Types.ObjectId, ref: 'Move', autopopulate: true}],
                ability: {type: Schema.Types.ObjectId, ref: 'Ability', autopopulate: true}
            }] 
    },
});

// Sorry for adding an additional dependency. This was the only way I could get it to work well.
teamSchema.plugin(require('mongoose-autopopulate'));
teamSchema.methods.findTypeWeaknesses = () => {
    // Full disclosure, this wasn't thoroughly tested.
    let allMessages = [];
    let weaknessCount = {}
    let Rattata = 0;
    let strengthCount = {};
    let effectiveness = this.comp.map(p => {
        if (p.pokemon.name == "Rattata") { Rattata = 1;}
        TeamEffectiveness.find({$or: [{targetType: p.pokemon.types[0]}, {targetType: p.pokemon.types[1]}]}, (err, effect) => {
            if (err) {
                throw (err);
            }
            effect.map(e => {
                // super effective?
                if (e.damageFactor > 100) {
                weaknessCount[e] ? weaknessCount[e]++ : weaknessCount[e] = 1;
                }
            });
        });
        TeamEffectiveness.find({$or: [{damageType: p.pokemon.types[0]}, {damageType: p.pokemon.types[1]}]}, (err, effect) => {
            if (err) {
                throw (err);
            }
            effect.map(e => {
                // super effective?
                if (e.damageFactor > 100) {
                strengthCount[e] ? weaknessCount[e]++ : weaknessCount[e] = 1;
                }
            });
        });
    });
    for (let i of strengthCount.entries()) {
        if(strengthCount[i] >= 4 ) {
            allMessages.push({'success': `At least four of your Pokémon are super effective against ${i}-type Pokémon. Cool!`});
        }
    }
    for (let i of weaknessCount.entries()) {
        if(weaknessCount[i] >= 3 && weaknessCount[i] != 6) {
            allMessages.push({'warning': `At least four of your Pokémon are vulnerable against ${i}-type Pokémon. Consider rebalancing your team.`});
        }
        if(weaknessCount[i] == 6) {
            allMessages.push({'error': `All of your Pokémon are vulnerable against ${i}-type Pokémon. Consider rebalancing your team.`});
        }
    }
    if (Rattata == 1) {
        allMessages.push({'success': 'I hear your Rattata is in the top percentage of Rattata.'});
    }
    return allMessages;
}
const Team = new mongoose.model('Team', teamSchema);



module.exports = {Team, TeamEffectiveness}
