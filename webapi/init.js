// init.js -- initialize the database.
// Based on code from Dr. McCown's Canvas Announcement - https://harding.instructure.com/courses/1226504/discussion_topics/3177364
// This script pulls pictures from a GitHub repository -- make sure you are connected to the internet!

const { Pokemon, MoveSet, Move, Ability } = require("./models/pokemon");
const { ObjectId }  = require('bson');
const {Team, TeamEffectiveness} = require("./models/team")
const User = require("./models/user");
const fs = require('fs');
const fetch = require('node-fetch');
const bcrypt = require('bcryptjs');

async function fetchResults(path) {
    return fetch(path)
        .then(res => { return res.buffer(); })
        .then(blob => {
            ;
            // console.log(blob);
            return blob;
        })
}

async function initTypes(typeEffectiveness) {
    await TeamEffectiveness.deleteMany({});
    let types = fs.readFileSync("test/data/type_names.json");
    types = JSON.parse(types).map(t => t.name);
    Promise.all(typeEffectiveness.map(async i => {
        let newCombo = new TeamEffectiveness();
        newCombo.damageType = types[i.damage_type_id - 1];
        newCombo.targetType = types[i.target_type_id - 1];
        newCombo.damageFactor = i.damage_factor;
        await newCombo.save();
    }))
    console.log("Type effectiveness collection built!")
}

async function initUser() {
    await User.deleteMany({});
    const user = new User({ username: "bsmith", password: bcrypt.hashSync('opensesame', 10) });
    await user.save();
    console.log("User bsmith created!")
}
async function initPkmn(dex) {
    await Pokemon.deleteMany({});
    let url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
    //path = url + "1" + ".png";
    console.log("Downloading images and importing Pokemon, this may take a moment.");
    await Promise.all(dex.map(async (i) => {
        const pkmn = new Pokemon(i);
        path = url + pkmn.pokedexNumber + ".png";

        pkmn.image = await fetchResults(path);
        pkmn.image.contentType = "image/png"

        await pkmn.save();
    })
    );
    console.log("Starting index build!")
    await Pokemon.syncIndexes();
    console.log("National Pokedex import complete!")
}

async function initAbilities(abilities) {
    await Ability.deleteMany({});

    await Promise.all(abilities.map(async (i) => {
        const newAbility = new Ability(i);
        await newAbility.save();
    }));
    console.log("Ability flavor text loaded!");
}

async function initMoves(moveSet, moves) {
    await MoveSet.deleteMany({});
    await Move.deleteMany({});
    let moveIds = {};

    await Promise.all(moves.map(async (i) => {
        const newMove = new Move(i);
        await newMove.save();
        moveIds[newMove.id] = newMove._id;
    }));
    console.log("Move import complete!")
    await Promise.all(moveSet.map(async (i) => {
        // console.log(i.pokedexNumber);
        const newMoveSet = new MoveSet(i);
        // setup the "relation" between a move in the moveset and the actual move object.
        newMoveSet.move = moveIds[newMoveSet.moveId];
        await newMoveSet.save();
    }));
    console.log("moveSet import complete!");
}

// The all new and improved dataset was provided by the lovely veekun/pokedex project on GitHub, which consists of a bunch of CSV files full of data dumped from the games.
// I brought that into SQLite, figured out how they setup their data (which is a lot of fun with no documentation) and cut it down to the test data we'd need.
// (The data was in 3NF, and I didn't completely denormalize, so Mongo isn't running as efficiently as it should be. Oh well.)
// That project is licensed under the MIT License, but of course the contents (but not the formats) of the files are (c) Nintendo/Creatures/Game Freak.

let promises = [];
const rawPokemon = fs.readFileSync("test/data/basic.json");
const natDex = JSON.parse(rawPokemon);
promises.push(initPkmn(natDex));

const rawAbility = fs.readFileSync("test/data/abilities.json");
const abilities = JSON.parse(rawAbility);
promises.push(initAbilities(abilities));

const rawMoveSets = fs.readFileSync("test/data/moveset.json");
const moveSets = JSON.parse(rawMoveSets);
const rawMoves = fs.readFileSync("test/data/moves.json");
const moves = JSON.parse(rawMoves);
promises.push(initMoves(moveSets, moves));
const rawTypeEfficiacy = fs.readFileSync("test/data/type_efficacy.json");
const typeEfficiciacy = JSON.parse(rawTypeEfficiacy);
promises.push(initTypes(typeEfficiciacy));

promises.push(initUser());


async function finish(arr) {
    await Promise.all(arr).then(async () => {
        // Ugly team demo setup...
        let teamMembers = await Pokemon.find({})
            .limit(6)
            .then((res) =>
                Promise.all(
                    res.map(async (i) =>
                        MoveSet.find({ pokedexNumber: { $eq: i.pokedexNumber } })
                            .populate("move")
                            .sort({ level: "descending" })
                            .select("move")
                            .limit(4)
                            .then((j) => {
                                return { pokemon: i._id, moves: j.map(m =>  ObjectId(m.move._id) ) };
                            })
                    )
                )
            );
        await Team.deleteMany({});
        let user = await User.findOne({}).select("_id");
        let newTeam = new Team({name: "My Team", user: user._id, comp: teamMembers});
        await newTeam.save();
        // await Team.findOne({}).exec().then((x) => console.log(x));
        console.log("Team created!")
        console.log("Database initialized! Have fun! 🎉");
        process.exit();
    });
}
finish(promises)
// process.exit();
