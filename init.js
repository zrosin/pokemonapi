// init.js -- initialize the database.
// Based on code from Dr. McCown's Canvas Announcement - https://harding.instructure.com/courses/1226504/discussion_topics/3177364

const Pokemon = require("./models/pokemon")

async function initDB() {
    await Pokemon.deleteMany({});
    for (let i of kantoDex) {
        const pkmn = new Pokemon(i);
        const pkmnSave = await pkmn.save();
    }
    console.log("Database initialized with the Kanto Pokedex!")
    process.exit();
}

// This data was gathered from a CSV of the serebii.net pokedex. 
// I got rid of the data we didn't need, and took the first 151 (basically, all the gen 1 pokemon) so we'd have a big test dataset.
// (Then, I converted it to JSON, of course.)
// CSV can be found here -- https://www.kaggle.com/rounakbanik/pokemon

const kantoDexJson = `[
    {
      "pokedexNumber":1,
      "name":"Bulbasaur",
      "height":0.7,
      "weight":6.9,
      "types":[
        "grass",
        "poison"
      ],
      "abilities":["Overgrow", "Chlorophyll"]
    },
    {
      "pokedexNumber":2,
      "name":"Ivysaur",
      "height":1.0,
      "weight":13.0,
      "types":[
        "grass",
        "poison"
      ],
      "abilities":["Overgrow", "Chlorophyll"]
    },
    {
      "pokedexNumber":3,
      "name":"Venusaur",
      "height":2.0,
      "weight":100.0,
      "types":[
        "grass",
        "poison"
      ],
      "abilities":["Overgrow", "Chlorophyll"]
    },
    {
      "pokedexNumber":4,
      "name":"Charmander",
      "height":0.6,
      "weight":8.5,
      "types":[
        "fire",
        null
      ],
      "abilities":["Blaze", "Solar Power"]
    },
    {
      "pokedexNumber":5,
      "name":"Charmeleon",
      "height":1.1,
      "weight":19.0,
      "types":[
        "fire",
        null
      ],
      "abilities":["Blaze", "Solar Power"]
    },
    {
      "pokedexNumber":6,
      "name":"Charizard",
      "height":1.7,
      "weight":90.5,
      "types":[
        "fire",
        "flying"
      ],
      "abilities":["Blaze", "Solar Power"]
    },
    {
      "pokedexNumber":7,
      "name":"Squirtle",
      "height":0.5,
      "weight":9.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Torrent", "Rain Dish"]
    },
    {
      "pokedexNumber":8,
      "name":"Wartortle",
      "height":1.0,
      "weight":22.5,
      "types":[
        "water",
        null
      ],
      "abilities":["Torrent", "Rain Dish"]
    },
    {
      "pokedexNumber":9,
      "name":"Blastoise",
      "height":1.6,
      "weight":85.5,
      "types":[
        "water",
        null
      ],
      "abilities":["Torrent", "Rain Dish"]
    },
    {
      "pokedexNumber":10,
      "name":"Caterpie",
      "height":0.3,
      "weight":2.9,
      "types":[
        "bug",
        null
      ],
      "abilities":["Shield Dust", "Run Away"]
    },
    {
      "pokedexNumber":11,
      "name":"Metapod",
      "height":0.7,
      "weight":9.9,
      "types":[
        "bug",
        null
      ],
      "abilities":["Shed Skin"]
    },
    {
      "pokedexNumber":12,
      "name":"Butterfree",
      "height":1.1,
      "weight":32.0,
      "types":[
        "bug",
        "flying"
      ],
      "abilities":["Compoundeyes", "Tinted Lens"]
    },
    {
      "pokedexNumber":13,
      "name":"Weedle",
      "height":0.3,
      "weight":3.2,
      "types":[
        "bug",
        "poison"
      ],
      "abilities":["Shield Dust", "Run Away"]
    },
    {
      "pokedexNumber":14,
      "name":"Kakuna",
      "height":0.6,
      "weight":10.0,
      "types":[
        "bug",
        "poison"
      ],
      "abilities":["Shed Skin"]
    },
    {
      "pokedexNumber":15,
      "name":"Beedrill",
      "height":1.0,
      "weight":29.5,
      "types":[
        "bug",
        "poison"
      ],
      "abilities":["Swarm", "Sniper"]
    },
    {
      "pokedexNumber":16,
      "name":"Pidgey",
      "height":0.3,
      "weight":1.8,
      "types":[
        "normal",
        "flying"
      ],
      "abilities":["Keen Eye", "Tangled Feet", "Big Pecks"]
    },
    {
      "pokedexNumber":17,
      "name":"Pidgeotto",
      "height":1.1,
      "weight":30.0,
      "types":[
        "normal",
        "flying"
      ],
      "abilities":["Keen Eye", "Tangled Feet", "Big Pecks"]
    },
    {
      "pokedexNumber":18,
      "name":"Pidgeot",
      "height":1.5,
      "weight":39.5,
      "types":[
        "normal",
        "flying"
      ],
      "abilities":["Keen Eye", "Tangled Feet", "Big Pecks"]
    },
    {
      "pokedexNumber":19,
      "name":"Rattata",
      "height":null,
      "weight":null,
      "types":[
        "normal",
        "dark"
      ],
      "abilities":["Run Away", "Guts", "Hustle", "Gluttony", "Hustle", "Thick Fat"]
    },
    {
      "pokedexNumber":20,
      "name":"Raticate",
      "height":null,
      "weight":null,
      "types":[
        "normal",
        "dark"
      ],
      "abilities":["Run Away", "Guts", "Hustle", "Gluttony", "Hustle", "Thick Fat"]
    },
    {
      "pokedexNumber":21,
      "name":"Spearow",
      "height":0.3,
      "weight":2.0,
      "types":[
        "normal",
        "flying"
      ],
      "abilities":["Keen Eye", "Sniper"]
    },
    {
      "pokedexNumber":22,
      "name":"Fearow",
      "height":1.2,
      "weight":38.0,
      "types":[
        "normal",
        "flying"
      ],
      "abilities":["Keen Eye", "Sniper"]
    },
    {
      "pokedexNumber":23,
      "name":"Ekans",
      "height":2.0,
      "weight":6.9,
      "types":[
        "poison",
        null
      ],
      "abilities":["Intimidate", "Shed Skin", "Unnerve"]
    },
    {
      "pokedexNumber":24,
      "name":"Arbok",
      "height":3.5,
      "weight":65.0,
      "types":[
        "poison",
        null
      ],
      "abilities":["Intimidate", "Shed Skin", "Unnerve"]
    },
    {
      "pokedexNumber":25,
      "name":"Pikachu",
      "height":0.4,
      "weight":6.0,
      "types":[
        "electric",
        null
      ],
      "abilities":["Static", "Lightningrod"]
    },
    {
      "pokedexNumber":26,
      "name":"Raichu",
      "height":null,
      "weight":null,
      "types":[
        "electric",
        "electric"
      ],
      "abilities":["Static", "Lightningrod", "Surge Surfer"]
    },
    {
      "pokedexNumber":27,
      "name":"Sandshrew",
      "height":null,
      "weight":null,
      "types":[
        "ground",
        "ice"
      ],
      "abilities":["Sand Veil", "Sand Rush", "Snow Cloak", "Slush Rush"]
    },
    {
      "pokedexNumber":28,
      "name":"Sandslash",
      "height":null,
      "weight":null,
      "types":[
        "ground",
        "ice"
      ],
      "abilities":["Sand Veil", "Sand Rush", "Snow Cloak", "Slush Rush"]
    },
    {
      "pokedexNumber":29,
      "name":"Nidoran\u2640",
      "height":0.4,
      "weight":7.0,
      "types":[
        "poison",
        null
      ],
      "abilities":["Poison Point", "Rivalry", "Hustle"]
    },
    {
      "pokedexNumber":30,
      "name":"Nidorina",
      "height":0.8,
      "weight":20.0,
      "types":[
        "poison",
        null
      ],
      "abilities":["Poison Point", "Rivalry", "Hustle"]
    },
    {
      "pokedexNumber":31,
      "name":"Nidoqueen",
      "height":1.3,
      "weight":60.0,
      "types":[
        "poison",
        "ground"
      ],
      "abilities":["Poison Point", "Rivalry", "Sheer Force"]
    },
    {
      "pokedexNumber":32,
      "name":"Nidoran\u2642",
      "height":0.5,
      "weight":9.0,
      "types":[
        "poison",
        null
      ],
      "abilities":["Poison Point", "Rivalry", "Hustle"]
    },
    {
      "pokedexNumber":33,
      "name":"Nidorino",
      "height":0.9,
      "weight":19.5,
      "types":[
        "poison",
        null
      ],
      "abilities":["Poison Point", "Rivalry", "Hustle"]
    },
    {
      "pokedexNumber":34,
      "name":"Nidoking",
      "height":1.4,
      "weight":62.0,
      "types":[
        "poison",
        "ground"
      ],
      "abilities":["Poison Point", "Rivalry", "Sheer Force"]
    },
    {
      "pokedexNumber":35,
      "name":"Clefairy",
      "height":0.6,
      "weight":7.5,
      "types":[
        "fairy",
        null
      ],
      "abilities":["Cute Charm", "Magic Guard", "Friend Guard"]
    },
    {
      "pokedexNumber":36,
      "name":"Clefable",
      "height":1.3,
      "weight":40.0,
      "types":[
        "fairy",
        null
      ],
      "abilities":["Cute Charm", "Magic Guard", "Unaware"]
    },
    {
      "pokedexNumber":37,
      "name":"Vulpix",
      "height":null,
      "weight":null,
      "types":[
        "fire",
        "ice"
      ],
      "abilities":["Flash Fire", "Drought", "Snow Cloak", "Snow Warning"]
    },
    {
      "pokedexNumber":38,
      "name":"Ninetales",
      "height":null,
      "weight":null,
      "types":[
        "fire",
        "ice"
      ],
      "abilities":["Flash Fire", "Drought", "Snow Cloak", "Snow Warning"]
    },
    {
      "pokedexNumber":39,
      "name":"Jigglypuff",
      "height":0.5,
      "weight":5.5,
      "types":[
        "normal",
        "fairy"
      ],
      "abilities":["Cute Charm", "Competitive", "Friend Guard"]
    },
    {
      "pokedexNumber":40,
      "name":"Wigglytuff",
      "height":1.0,
      "weight":12.0,
      "types":[
        "normal",
        "fairy"
      ],
      "abilities":["Cute Charm", "Competitive", "Frisk"]
    },
    {
      "pokedexNumber":41,
      "name":"Zubat",
      "height":0.8,
      "weight":7.5,
      "types":[
        "poison",
        "flying"
      ],
      "abilities":["Inner Focus", "Infiltrator"]
    },
    {
      "pokedexNumber":42,
      "name":"Golbat",
      "height":1.6,
      "weight":55.0,
      "types":[
        "poison",
        "flying"
      ],
      "abilities":["Inner Focus", "Infiltrator"]
    },
    {
      "pokedexNumber":43,
      "name":"Oddish",
      "height":0.5,
      "weight":5.4,
      "types":[
        "grass",
        "poison"
      ],
      "abilities":["Chlorophyll", "Run Away"]
    },
    {
      "pokedexNumber":44,
      "name":"Gloom",
      "height":0.8,
      "weight":8.6,
      "types":[
        "grass",
        "poison"
      ],
      "abilities":["Chlorophyll", "Stench"]
    },
    {
      "pokedexNumber":45,
      "name":"Vileplume",
      "height":1.2,
      "weight":18.6,
      "types":[
        "grass",
        "poison"
      ],
      "abilities":["Chlorophyll", "Effect Spore"]
    },
    {
      "pokedexNumber":46,
      "name":"Paras",
      "height":0.3,
      "weight":5.4,
      "types":[
        "bug",
        "grass"
      ],
      "abilities":["Effect Spore", "Dry Skin", "Damp"]
    },
    {
      "pokedexNumber":47,
      "name":"Parasect",
      "height":1.0,
      "weight":29.5,
      "types":[
        "bug",
        "grass"
      ],
      "abilities":["Effect Spore", "Dry Skin", "Damp"]
    },
    {
      "pokedexNumber":48,
      "name":"Venonat",
      "height":1.0,
      "weight":30.0,
      "types":[
        "bug",
        "poison"
      ],
      "abilities":["Compoundeyes", "Tinted Lens", "Run Away"]
    },
    {
      "pokedexNumber":49,
      "name":"Venomoth",
      "height":1.5,
      "weight":12.5,
      "types":[
        "bug",
        "poison"
      ],
      "abilities":["Shield Dust", "Tinted Lens", "Wonder Skin "]
    },
    {
      "pokedexNumber":50,
      "name":"Diglett",
      "height":null,
      "weight":null,
      "types":[
        "ground",
        "ground"
      ],
      "abilities":["Sand Veil", "Arena Trap", "Sand Force", "Sand Veil", "Tangling Hair", "Sand Force"]
    },
    {
      "pokedexNumber":51,
      "name":"Dugtrio",
      "height":null,
      "weight":null,
      "types":[
        "ground",
        "ground"
      ],
      "abilities":["Sand Veil", "Arena Trap", "Sand Force", "Sand Veil", "Tangling Hair", "Sand Force"]
    },
    {
      "pokedexNumber":52,
      "name":"Meowth",
      "height":null,
      "weight":null,
      "types":[
        "normal",
        "dark"
      ],
      "abilities":["Pickup", "Technician", "Unnerve", "Pickup", "Technician", "Rattled"]
    },
    {
      "pokedexNumber":53,
      "name":"Persian",
      "height":null,
      "weight":null,
      "types":[
        "normal",
        "dark"
      ],
      "abilities":["Limber", "Technician", "Unnerve", "Fur Coat", "Technician", "Rattled"]
    },
    {
      "pokedexNumber":54,
      "name":"Psyduck",
      "height":0.8,
      "weight":19.6,
      "types":[
        "water",
        null
      ],
      "abilities":["Damp", "Cloud Nine", "Swift Swim"]
    },
    {
      "pokedexNumber":55,
      "name":"Golduck",
      "height":1.7,
      "weight":76.6,
      "types":[
        "water",
        null
      ],
      "abilities":["Damp", "Cloud Nine", "Swift Swim"]
    },
    {
      "pokedexNumber":56,
      "name":"Mankey",
      "height":0.5,
      "weight":28.0,
      "types":[
        "fighting",
        null
      ],
      "abilities":["Vital Spirit", "Anger Point", "Defiant"]
    },
    {
      "pokedexNumber":57,
      "name":"Primeape",
      "height":1.0,
      "weight":32.0,
      "types":[
        "fighting",
        null
      ],
      "abilities":["Vital Spirit", "Anger Point", "Defiant"]
    },
    {
      "pokedexNumber":58,
      "name":"Growlithe",
      "height":0.7,
      "weight":19.0,
      "types":[
        "fire",
        null
      ],
      "abilities":["Intimidate", "Flash Fire", "Justified"]
    },
    {
      "pokedexNumber":59,
      "name":"Arcanine",
      "height":1.9,
      "weight":155.0,
      "types":[
        "fire",
        null
      ],
      "abilities":["Intimidate", "Flash Fire", "Justified"]
    },
    {
      "pokedexNumber":60,
      "name":"Poliwag",
      "height":0.6,
      "weight":12.4,
      "types":[
        "water",
        null
      ],
      "abilities":["Water Absorb", "Damp", "Swift Swim"]
    },
    {
      "pokedexNumber":61,
      "name":"Poliwhirl",
      "height":1.0,
      "weight":20.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Water Absorb", "Damp", "Swift Swim"]
    },
    {
      "pokedexNumber":62,
      "name":"Poliwrath",
      "height":1.3,
      "weight":54.0,
      "types":[
        "water",
        "fighting"
      ],
      "abilities":["Water Absorb", "Damp", "Swift Swim"]
    },
    {
      "pokedexNumber":63,
      "name":"Abra",
      "height":0.9,
      "weight":19.5,
      "types":[
        "psychic",
        null
      ],
      "abilities":["Synchronize", "Inner Focus", "Magic Guard"]
    },
    {
      "pokedexNumber":64,
      "name":"Kadabra",
      "height":1.3,
      "weight":56.5,
      "types":[
        "psychic",
        null
      ],
      "abilities":["Synchronize", "Inner Focus", "Magic Guard"]
    },
    {
      "pokedexNumber":65,
      "name":"Alakazam",
      "height":1.5,
      "weight":48.0,
      "types":[
        "psychic",
        null
      ],
      "abilities":["Synchronize", "Inner Focus", "Magic Guard"]
    },
    {
      "pokedexNumber":66,
      "name":"Machop",
      "height":0.8,
      "weight":19.5,
      "types":[
        "fighting",
        null
      ],
      "abilities":["Guts", "No Guard", "Steadfast"]
    },
    {
      "pokedexNumber":67,
      "name":"Machoke",
      "height":1.5,
      "weight":70.5,
      "types":[
        "fighting",
        null
      ],
      "abilities":["Guts", "No Guard", "Steadfast"]
    },
    {
      "pokedexNumber":68,
      "name":"Machamp",
      "height":1.6,
      "weight":130.0,
      "types":[
        "fighting",
        null
      ],
      "abilities":["Guts", "No Guard", "Steadfast"]
    },
    {
      "pokedexNumber":69,
      "name":"Bellsprout",
      "height":0.7,
      "weight":4.0,
      "types":[
        "grass",
        "poison"
      ],
      "abilities":["Chlorophyll", "Gluttony"]
    },
    {
      "pokedexNumber":70,
      "name":"Weepinbell",
      "height":1.0,
      "weight":6.4,
      "types":[
        "grass",
        "poison"
      ],
      "abilities":["Chlorophyll", "Gluttony"]
    },
    {
      "pokedexNumber":71,
      "name":"Victreebel",
      "height":1.7,
      "weight":15.5,
      "types":[
        "grass",
        "poison"
      ],
      "abilities":["Chlorophyll", "Gluttony"]
    },
    {
      "pokedexNumber":72,
      "name":"Tentacool",
      "height":0.9,
      "weight":45.5,
      "types":[
        "water",
        "poison"
      ],
      "abilities":["Clear Body", "Liquid Ooze", "Rain Dish"]
    },
    {
      "pokedexNumber":73,
      "name":"Tentacruel",
      "height":1.6,
      "weight":55.0,
      "types":[
        "water",
        "poison"
      ],
      "abilities":["Clear Body", "Liquid Ooze", "Rain Dish"]
    },
    {
      "pokedexNumber":74,
      "name":"Geodude",
      "height":null,
      "weight":null,
      "types":[
        "rock",
        "ground"
      ],
      "abilities":["Rock Head", "Sturdy", "Sand Veil", "Magnet Pull", "Sturdy", "Galvanize"]
    },
    {
      "pokedexNumber":75,
      "name":"Graveler",
      "height":null,
      "weight":null,
      "types":[
        "rock",
        "ground"
      ],
      "abilities":["Rock Head", "Sturdy", "Sand Veil", "Magnet Pull", "Sturdy", "Galvanize"]
    },
    {
      "pokedexNumber":76,
      "name":"Golem",
      "height":null,
      "weight":null,
      "types":[
        "rock",
        "ground"
      ],
      "abilities":["Rock Head", "Sturdy", "Sand Veil", "Magnet Pull", "Sturdy", "Galvanize"]
    },
    {
      "pokedexNumber":77,
      "name":"Ponyta",
      "height":1.0,
      "weight":30.0,
      "types":[
        "fire",
        null
      ],
      "abilities":["Run Away", "Flash Fire", "Flame Body"]
    },
    {
      "pokedexNumber":78,
      "name":"Rapidash",
      "height":1.7,
      "weight":95.0,
      "types":[
        "fire",
        null
      ],
      "abilities":["Run Away", "Flash Fire", "Flame Body"]
    },
    {
      "pokedexNumber":79,
      "name":"Slowpoke",
      "height":1.2,
      "weight":36.0,
      "types":[
        "water",
        "psychic"
      ],
      "abilities":["Oblivious", "Own Tempo", "Regenerator"]
    },
    {
      "pokedexNumber":80,
      "name":"Slowbro",
      "height":1.6,
      "weight":78.5,
      "types":[
        "water",
        "psychic"
      ],
      "abilities":["Oblivious", "Own Tempo", "Regenerator"]
    },
    {
      "pokedexNumber":81,
      "name":"Magnemite",
      "height":0.3,
      "weight":6.0,
      "types":[
        "electric",
        "steel"
      ],
      "abilities":["Magnet Pull", "Sturdy", "Analytic"]
    },
    {
      "pokedexNumber":82,
      "name":"Magneton",
      "height":1.0,
      "weight":60.0,
      "types":[
        "electric",
        "steel"
      ],
      "abilities":["Magnet Pull", "Sturdy", "Analytic"]
    },
    {
      "pokedexNumber":83,
      "name":"Farfetch'd",
      "height":0.8,
      "weight":15.0,
      "types":[
        "normal",
        "flying"
      ],
      "abilities":["Keen Eye", "Inner Focus", "Defiant"]
    },
    {
      "pokedexNumber":84,
      "name":"Doduo",
      "height":1.4,
      "weight":39.2,
      "types":[
        "normal",
        "flying"
      ],
      "abilities":["Run Away", "Early Bird", "Tangled Feet"]
    },
    {
      "pokedexNumber":85,
      "name":"Dodrio",
      "height":1.8,
      "weight":85.2,
      "types":[
        "normal",
        "flying"
      ],
      "abilities":["Run Away", "Early Bird", "Tangled Feet"]
    },
    {
      "pokedexNumber":86,
      "name":"Seel",
      "height":1.1,
      "weight":90.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Thick Fat", "Hydration", "Ice Body"]
    },
    {
      "pokedexNumber":87,
      "name":"Dewgong",
      "height":1.7,
      "weight":120.0,
      "types":[
        "water",
        "ice"
      ],
      "abilities":["Thick Fat", "Hydration", "Ice Body"]
    },
    {
      "pokedexNumber":88,
      "name":"Grimer",
      "height":null,
      "weight":null,
      "types":[
        "poison",
        "poison"
      ],
      "abilities":["Stench", "Sticky Hold", "Poison Touch", "Poison Touch", "Gluttony", "Power of Alchemy"]
    },
    {
      "pokedexNumber":89,
      "name":"Muk",
      "height":null,
      "weight":null,
      "types":[
        "poison",
        "poison"
      ],
      "abilities":["Stench", "Sticky Hold", "Poison Touch", "Poison Touch", "Gluttony", "Power of Alchemy"]
    },
    {
      "pokedexNumber":90,
      "name":"Shellder",
      "height":0.3,
      "weight":4.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Shell Armor", "Skill Link", "Overcoat"]
    },
    {
      "pokedexNumber":91,
      "name":"Cloyster",
      "height":1.5,
      "weight":132.5,
      "types":[
        "water",
        "ice"
      ],
      "abilities":["Shell Armor", "Skill Link", "Overcoat"]
    },
    {
      "pokedexNumber":92,
      "name":"Gastly",
      "height":1.3,
      "weight":0.1,
      "types":[
        "ghost",
        "poison"
      ],
      "abilities":["Levitate"]
    },
    {
      "pokedexNumber":93,
      "name":"Haunter",
      "height":1.6,
      "weight":0.1,
      "types":[
        "ghost",
        "poison"
      ],
      "abilities":["Levitate"]
    },
    {
      "pokedexNumber":94,
      "name":"Gengar",
      "height":1.5,
      "weight":40.5,
      "types":[
        "ghost",
        "poison"
      ],
      "abilities":["Cursed Body"]
    },
    {
      "pokedexNumber":95,
      "name":"Onix",
      "height":8.8,
      "weight":210.0,
      "types":[
        "rock",
        "ground"
      ],
      "abilities":["Rock Head", "Sturdy", "Weak Armor"]
    },
    {
      "pokedexNumber":96,
      "name":"Drowzee",
      "height":1.0,
      "weight":32.4,
      "types":[
        "psychic",
        null
      ],
      "abilities":["Insomnia", "Forewarn", "Inner Focus"]
    },
    {
      "pokedexNumber":97,
      "name":"Hypno",
      "height":1.6,
      "weight":75.6,
      "types":[
        "psychic",
        null
      ],
      "abilities":["Insomnia", "Forewarn", "Inner Focus"]
    },
    {
      "pokedexNumber":98,
      "name":"Krabby",
      "height":0.4,
      "weight":6.5,
      "types":[
        "water",
        null
      ],
      "abilities":["Hyper Cutter", "Shell Armor", "Sheer Force"]
    },
    {
      "pokedexNumber":99,
      "name":"Kingler",
      "height":1.3,
      "weight":60.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Hyper Cutter", "Shell Armor", "Sheer Force"]
    },
    {
      "pokedexNumber":100,
      "name":"Voltorb",
      "height":0.5,
      "weight":10.4,
      "types":[
        "electric",
        null
      ],
      "abilities":["Soundproof", "Static", "Aftermath"]
    },
    {
      "pokedexNumber":101,
      "name":"Electrode",
      "height":1.2,
      "weight":66.6,
      "types":[
        "electric",
        null
      ],
      "abilities":["Soundproof", "Static", "Aftermath"]
    },
    {
      "pokedexNumber":102,
      "name":"Exeggcute",
      "height":0.4,
      "weight":2.5,
      "types":[
        "grass",
        "psychic"
      ],
      "abilities":["Chlorophyll", "Harvest"]
    },
    {
      "pokedexNumber":103,
      "name":"Exeggutor",
      "height":null,
      "weight":null,
      "types":[
        "grass",
        "psychic"
      ],
      "abilities":["Chlorophyll", "Harvest", "Frisk", "Harvest"]
    },
    {
      "pokedexNumber":104,
      "name":"Cubone",
      "height":0.4,
      "weight":6.5,
      "types":[
        "ground",
        null
      ],
      "abilities":["Rock Head", "Lightningrod", "Battle Armor"]
    },
    {
      "pokedexNumber":105,
      "name":"Marowak",
      "height":null,
      "weight":null,
      "types":[
        "ground",
        "fire"
      ],
      "abilities":["Rock Head", "Lightningrod", "Battle Armor", "Cursed Body", "Lightningrod", "Rock Head"]
    },
    {
      "pokedexNumber":106,
      "name":"Hitmonlee",
      "height":1.5,
      "weight":49.8,
      "types":[
        "fighting",
        null
      ],
      "abilities":["Limber", "Reckless", "Unburden"]
    },
    {
      "pokedexNumber":107,
      "name":"Hitmonchan",
      "height":1.4,
      "weight":50.2,
      "types":[
        "fighting",
        null
      ],
      "abilities":["Keen Eye", "Iron Fist", "Inner Focus"]
    },
    {
      "pokedexNumber":108,
      "name":"Lickitung",
      "height":1.2,
      "weight":65.5,
      "types":[
        "normal",
        null
      ],
      "abilities":["Own Tempo", "Oblivious", "Cloud Nine"]
    },
    {
      "pokedexNumber":109,
      "name":"Koffing",
      "height":0.6,
      "weight":1.0,
      "types":[
        "poison",
        null
      ],
      "abilities":["Levitate"]
    },
    {
      "pokedexNumber":110,
      "name":"Weezing",
      "height":1.2,
      "weight":9.5,
      "types":[
        "poison",
        null
      ],
      "abilities":["Levitate"]
    },
    {
      "pokedexNumber":111,
      "name":"Rhyhorn",
      "height":1.0,
      "weight":115.0,
      "types":[
        "ground",
        "rock"
      ],
      "abilities":["Lightningrod", "Rock Head", "Reckless"]
    },
    {
      "pokedexNumber":112,
      "name":"Rhydon",
      "height":1.9,
      "weight":120.0,
      "types":[
        "ground",
        "rock"
      ],
      "abilities":["Lightningrod", "Rock Head", "Reckless"]
    },
    {
      "pokedexNumber":113,
      "name":"Chansey",
      "height":1.1,
      "weight":34.6,
      "types":[
        "normal",
        null
      ],
      "abilities":["Natural Cure", "Serene Grace", "Healer"]
    },
    {
      "pokedexNumber":114,
      "name":"Tangela",
      "height":1.0,
      "weight":35.0,
      "types":[
        "grass",
        null
      ],
      "abilities":["Chlorophyll", "Leaf Guard", "Regenerator"]
    },
    {
      "pokedexNumber":115,
      "name":"Kangaskhan",
      "height":2.2,
      "weight":80.0,
      "types":[
        "normal",
        null
      ],
      "abilities":["Early Bird", "Scrappy", "Inner Focus"]
    },
    {
      "pokedexNumber":116,
      "name":"Horsea",
      "height":0.4,
      "weight":8.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Swift Swim", "Sniper", "Damp"]
    },
    {
      "pokedexNumber":117,
      "name":"Seadra",
      "height":1.2,
      "weight":25.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Poison Point", "Sniper", "Damp"]
    },
    {
      "pokedexNumber":118,
      "name":"Goldeen",
      "height":0.6,
      "weight":15.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Swift Swim", "Water Veil", "Lightningrod"]
    },
    {
      "pokedexNumber":119,
      "name":"Seaking",
      "height":1.3,
      "weight":39.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Swift Swim", "Water Veil", "Lightningrod"]
    },
    {
      "pokedexNumber":120,
      "name":"Staryu",
      "height":0.8,
      "weight":34.5,
      "types":[
        "water",
        null
      ],
      "abilities":["Illuminate", "Natural Cure", "Analytic"]
    },
    {
      "pokedexNumber":121,
      "name":"Starmie",
      "height":1.1,
      "weight":80.0,
      "types":[
        "water",
        "psychic"
      ],
      "abilities":["Illuminate", "Natural Cure", "Analytic"]
    },
    {
      "pokedexNumber":122,
      "name":"Mr. Mime",
      "height":1.3,
      "weight":54.5,
      "types":[
        "psychic",
        "fairy"
      ],
      "abilities":["Soundproof", "Filter", "Technician"]
    },
    {
      "pokedexNumber":123,
      "name":"Scyther",
      "height":1.5,
      "weight":56.0,
      "types":[
        "bug",
        "flying"
      ],
      "abilities":["Swarm", "Technician", "Steadfast"]
    },
    {
      "pokedexNumber":124,
      "name":"Jynx",
      "height":1.4,
      "weight":40.6,
      "types":[
        "ice",
        "psychic"
      ],
      "abilities":["Oblivious", "Forewarn", "Dry Skin"]
    },
    {
      "pokedexNumber":125,
      "name":"Electabuzz",
      "height":1.1,
      "weight":30.0,
      "types":[
        "electric",
        null
      ],
      "abilities":["Static", "Vital Spirit"]
    },
    {
      "pokedexNumber":126,
      "name":"Magmar",
      "height":1.3,
      "weight":44.5,
      "types":[
        "fire",
        null
      ],
      "abilities":["Flame Body", "Vital Spirit"]
    },
    {
      "pokedexNumber":127,
      "name":"Pinsir",
      "height":1.5,
      "weight":55.0,
      "types":[
        "bug",
        null
      ],
      "abilities":["Hyper Cutter", "Mold Breaker", "Moxie"]
    },
    {
      "pokedexNumber":128,
      "name":"Tauros",
      "height":1.4,
      "weight":88.4,
      "types":[
        "normal",
        null
      ],
      "abilities":["Intimidate", "Anger Point", "Sheer Force"]
    },
    {
      "pokedexNumber":129,
      "name":"Magikarp",
      "height":0.9,
      "weight":10.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Swift Swim", "Rattled"]
    },
    {
      "pokedexNumber":130,
      "name":"Gyarados",
      "height":6.5,
      "weight":235.0,
      "types":[
        "water",
        "flying"
      ],
      "abilities":["Intimidate", "Moxie"]
    },
    {
      "pokedexNumber":131,
      "name":"Lapras",
      "height":2.5,
      "weight":220.0,
      "types":[
        "water",
        "ice"
      ],
      "abilities":["Water Absorb", "Shell Armor", "Hydration"]
    },
    {
      "pokedexNumber":132,
      "name":"Ditto",
      "height":0.3,
      "weight":4.0,
      "types":[
        "normal",
        null
      ],
      "abilities":["Limber", "Imposter"]
    },
    {
      "pokedexNumber":133,
      "name":"Eevee",
      "height":0.3,
      "weight":6.5,
      "types":[
        "normal",
        null
      ],
      "abilities":["Run Away", "Adaptability", "Anticipation"]
    },
    {
      "pokedexNumber":134,
      "name":"Vaporeon",
      "height":1.0,
      "weight":29.0,
      "types":[
        "water",
        null
      ],
      "abilities":["Water Absorb", "Hydration"]
    },
    {
      "pokedexNumber":135,
      "name":"Jolteon",
      "height":0.8,
      "weight":24.5,
      "types":[
        "electric",
        null
      ],
      "abilities":["Volt Absorb", "Quick Feet"]
    },
    {
      "pokedexNumber":136,
      "name":"Flareon",
      "height":0.9,
      "weight":25.0,
      "types":[
        "fire",
        null
      ],
      "abilities":["Flash Fire", "Guts"]
    },
    {
      "pokedexNumber":137,
      "name":"Porygon",
      "height":0.8,
      "weight":36.5,
      "types":[
        "normal",
        null
      ],
      "abilities":["Trace", "Download", "Analytic"]
    },
    {
      "pokedexNumber":138,
      "name":"Omanyte",
      "height":0.4,
      "weight":7.5,
      "types":[
        "rock",
        "water"
      ],
      "abilities":["Swift Swim", "Shell Armor", "Weak Armor"]
    },
    {
      "pokedexNumber":139,
      "name":"Omastar",
      "height":1.0,
      "weight":35.0,
      "types":[
        "rock",
        "water"
      ],
      "abilities":["Swift Swim", "Shell Armor", "Weak Armor"]
    },
    {
      "pokedexNumber":140,
      "name":"Kabuto",
      "height":0.5,
      "weight":11.5,
      "types":[
        "rock",
        "water"
      ],
      "abilities":["Swift Swim", "Battle Armor", "Weak Armor"]
    },
    {
      "pokedexNumber":141,
      "name":"Kabutops",
      "height":1.3,
      "weight":40.5,
      "types":[
        "rock",
        "water"
      ],
      "abilities":["Swift Swim", "Battle Armor", "Weak Armor"]
    },
    {
      "pokedexNumber":142,
      "name":"Aerodactyl",
      "height":1.8,
      "weight":59.0,
      "types":[
        "rock",
        "flying"
      ],
      "abilities":["Rock Head", "Pressure", "Unnerve"]
    },
    {
      "pokedexNumber":143,
      "name":"Snorlax",
      "height":2.1,
      "weight":460.0,
      "types":[
        "normal",
        null
      ],
      "abilities":["Immunity", "Thick Fat", "Gluttony"]
    },
    {
      "pokedexNumber":144,
      "name":"Articuno",
      "height":1.7,
      "weight":55.4,
      "types":[
        "ice",
        "flying"
      ],
      "abilities":["Pressure", "Snow Cloak"]
    },
    {
      "pokedexNumber":145,
      "name":"Zapdos",
      "height":1.6,
      "weight":52.6,
      "types":[
        "electric",
        "flying"
      ],
      "abilities":["Pressure", "Static"]
    },
    {
      "pokedexNumber":146,
      "name":"Moltres",
      "height":2.0,
      "weight":60.0,
      "types":[
        "fire",
        "flying"
      ],
      "abilities":["Pressure", "Flame Body"]
    },
    {
      "pokedexNumber":147,
      "name":"Dratini",
      "height":1.8,
      "weight":3.3,
      "types":[
        "dragon",
        null
      ],
      "abilities":["Shed Skin", "Marvel Scale"]
    },
    {
      "pokedexNumber":148,
      "name":"Dragonair",
      "height":4.0,
      "weight":16.5,
      "types":[
        "dragon",
        null
      ],
      "abilities":["Shed Skin", "Marvel Scale"]
    },
    {
      "pokedexNumber":149,
      "name":"Dragonite",
      "height":2.2,
      "weight":210.0,
      "types":[
        "dragon",
        "flying"
      ],
      "abilities":["Inner Focus", "Multiscale"]
    },
    {
      "pokedexNumber":150,
      "name":"Mewtwo",
      "height":2.0,
      "weight":122.0,
      "types":[
        "psychic",
        null
      ],
      "abilities":["Pressure", "Unnerve"]
    },
    {
      "pokedexNumber":151,
      "name":"Mew",
      "height":0.4,
      "weight":4.0,
      "types":[
        "psychic",
        null
      ],
      "abilities":["Synchronize"]
    }
  ]`
const kantoDex = JSON.parse(kantoDexJson);

// initialize the DB!
initDB();