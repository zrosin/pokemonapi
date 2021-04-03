# Pokémon API

![tests](https://github.com/jedieaston/pokemonapi/actions/workflows/main.yml/badge.svg)

Web Development 2, Spring 2021.

By Zach Rosin and Easton Pillay.

How to use:

` npm run init ` -- Initializes the database with the Kanto Pokedex. Unnecessary for running the mocha tests, but you may want to before trying the index.html file.

`npm start` -- Runs server with all routes on http://localhost:8000/api/pokemon/. Initializes with 150 pokemon. These pokemon are overwritten every time npm start is called. Browse to http://localhost:8000/ to get to index.html.

`npm test` -- Runs test script. Displays results in console.

Routes:

    GET:
        
        All Pokemon.
            http://localhost:8000/api/pokemon/
            Status Codes:
            200 OK
            400 Error
            404 Not Found - No pokemon found.

        By ID.
            http://localhost:8000/api/pokemon/id/:id
            Status Codes:
            200 OK
            400 Error
            404 Not Found - No pokemon found.

        By Pokedex Number.
            http://localhost:8000/api/pokemon/pokedex/:pokedex
            Status Codes:
            200 OK
            400 Error
            404 Not Found - No pokemon found.

        By Type.
            http://localhost:8000/api/pokemon/type/:type
            Status Codes:
            200 OK
            400 Error
            404 Not Found - No pokemon found.

    POST:
        Adds new pokemon as long as pokedex is unique and a positive number.
            http://localhost:8000/api/pokemon/
            Status Codes:
            201 Created
            400 Error
            404 Not Found - Incorrectly formatted pokemon

    PUT:
        Edit existing pokemon with given _id.
            http://localhost:8000/api/pokemon/id/:id
            Status Codes:
            200 OK - Success
            400 Error
            404 Not Found - Pokemon not found/Incorrect format

    DELETE:
        Delete existing pokemon with given _id.
            http://localhost:8000/api/pokemon/id/:id
            Status Codes:
            204 No Content - Success
            400 Error
            404 Not Found - Pokemon not found/Incorrect format

In general, we use 400 for an unknown error, and 404 when we know error, and we return a json describing error whether there is a 404 or a 400.

Contributions:
    
   Zach - 50%:
        Routes, Testing.
    
   Easton - 50%:
        DB Schema, index.html file, project setup.
