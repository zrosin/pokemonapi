# Pokemon API

Web Development 2, Spring 2021.

By Zach Rosin and Easton Pillay.

How to use:

npm start -- Runs server with all routes on http://localhost:8000/api/pokemon/. Initializes with 150 pokemon. These pokemon are overwritten every time npm start is called.

npm test -- Runs test script. Displays results in console.

Routes:
    GET:
        All Pokemon.
            http://localhost:8000/api/pokemon/
            Status Codes:
            200 OK
            400 Error
            404 Not Found - No pokemon found

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

Contribution:
    Zach - 50%:
        Routes, Testing.
    Easton - 50%: