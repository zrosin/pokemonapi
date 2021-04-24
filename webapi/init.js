// init.js -- initialize the database.
// Based on code from Dr. McCown's Canvas Announcement - https://harding.instructure.com/courses/1226504/discussion_topics/3177364
// This script pulls pictures from a GitHub repository -- make sure you are connected to the internet!

const {Pokemon, MoveSet, Move, Ability} = require("./models/pokemon");
// const  = require("./models/moves");
const fs = require('fs');


async function initPkmn(dex) {
    await Pokemon.deleteMany({});
    let url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
    //path = url + "1" + ".png";

    await Promise.all(dex.map(async (i) => {
        const pkmn = new Pokemon(i);
        path = url + pkmn.pokedexNumber + ".png";

        pkmn.img = await ((path) => fetch(path).then(res => res.buffer()))
        pkmn.img.contentType = "image/png"

        await pkmn.save();
    })
    );
    console.log("Database initialized with the National Pokedex!")
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

    console.log("Importing moveSets, this may take a moment...")
    await Promise.all(moveSet.map(async (i) => {
        // console.log(i.pokedexNumber);
        const newMoveSet = new MoveSet(i);
        await newMoveSet.save();
    }));
    console.log("moveSet import complete!");
    await Promise.all(moves.map(async (i) => {
        const newMove = new Move(i);
        await newMove.save();
    }));
    console.log("Move import complete!")
}

// The all new and improved dataset was provided by the lovely veekun/pokedex project on GitHub, which consists of a bunch of CSV files full of data dumped from the games.
// I brought that into SQLite, figured out how they setup their data (which is a lot of fun with no documentation) and cut it down to the test data we'd need.
// (The data was in 3NF, and I didn't completely denormalize, so Mongo isn't running as fast as it would like. Oh well.)
// That project is licensed under the MIT License, but of course the contents (but not the formats) of the files are (c) Nintendo/Creatures/Game Freak.

const rawPokemon = fs.readFileSync("test/data/basic.json");
const natDex = JSON.parse(rawPokemon);
initPkmn(natDex);

const rawAbility = fs.readFileSync("test/data/abilities.json");
const abilities = JSON.parse(rawAbility);
initAbilities(abilities);

const rawMoveSets = fs.readFileSync("test/data/moveset.json");
const moveSets = JSON.parse(rawMoveSets);
const rawMoves = fs.readFileSync("test/data/moves.json");
const moves = JSON.parse(rawMoves);
initMoves(moveSets, moves).then(() => {
    console.log("Database initialized! Have fun! 🎉");
    process.exit(); 
});

