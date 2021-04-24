// init.js -- initialize the database.
// Based on code from Dr. McCown's Canvas Announcement - https://harding.instructure.com/courses/1226504/discussion_topics/3177364

const Pokemon = require("./models/pokemon");
const fs = require('fs');


async function initDB() {
    await Pokemon.deleteMany({});
    for (let i of natDex) {
        const pkmn = new Pokemon(i);
        const pkmnSave = await pkmn.save();
    }
    console.log("Database initialized with the National Pokedex!")
    process.exit();
}

// The all new and improved dataset was provided by the lovely veekun/pokedex project on GitHub, which consists of a bunch of CSV files full of data dumped from the games.
// I brought that into SQLite, figured out how they setup their data (which is a lot of fun with no documentation) and cut it down to the test data we'd need.
// That project is licensed under the MIT License, but of course the contents (but not the formats) of the files are Nintendo/Creatures/Game Freak.


const rawPokemon = fs.readFileSync("test/data/basic.json");
const natDex = JSON.parse(rawPokemon);

// initialize the DB!
initDB();