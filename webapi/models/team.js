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

teamSchema.methods.findTypeWeaknesses = async function() {
    // Full disclosure, this wasn't thoroughly tested.
    if (this.comp.length == 0) return [{"error": "It's not safe to go out there without any Pokémon. Add at least one to your team and try again!"}]
    let allMessages = [];
    let weaknessCount = new Map();
    let strengthCount = new Map();
    let Rattata = false;
    let effectiveness = await Promise.all(this.comp.map(async p => {
        if (p.pokemon.name == "Rattata") { Rattata = true;}
        await TeamEffectiveness.find({$or: [{targetType: p.pokemon.types[0]}, {targetType: p.pokemon.types[1]}]}, (err, effect) => {
            if (err) {
                throw (err);
            }
            effect.map(e => {
                // super effective?
                if (e.damageFactor > 100) {
                weaknessCount.set(e.damageType, (weaknessCount.get(e.damageType) ? (weaknessCount.get(e.damageType) + 1) : 1));
                }
            });
        });
        await TeamEffectiveness.find({$or: [{damageType: p.pokemon.types[0]}, {damageType: p.pokemon.types[1]}]}, (err, effect) => {
            if (err) {
                throw (err);
            }
            effect.map(e => {
                // super effective?
                if (e.damageFactor > 100) {
                    strengthCount.set(e.damageType, (strengthCount.get(e.damageType) ? (strengthCount.get(e.damageType) + 1) : 1));
                }
            });
        });
    }));
    // return strengthCount;
    // console.log(`The strength count loop! ${strengthCount.entries()}`);
    for(let [k, v] of strengthCount.entries()) {
        if(v >= 3 ) {
            allMessages.push({'success': `At least three of your Pokémon are super effective against ${k}-type Pokémon. Cool!`});
        }
    }
    for (let [k, v] of weaknessCount.entries()) {
        if(v >= 3 && v != 6) {
            allMessages.push({'warning': `At least three of your Pokémon are vulnerable against ${k}-type Pokémon. Consider rebalancing your team.`});
        }
        if(v == 6) {
            allMessages.push({'error': `All of your Pokémon are vulnerable against ${k}-type Pokémon. Consider rebalancing your team.`});
        }
    }
    if (this.comp.length < 6) {
        allMessages.push({'warning': `You only have ${this.comp.length} Pokémon. Consider filling up your team!`})
    }
    if (Rattata) {
        allMessages.push({'success': 'I hear your Rattata is in the top percentage of Rattata.'});
    }
    return allMessages;
}
const Team = new mongoose.model('Team', teamSchema);

module.exports = {Team, TeamEffectiveness}
