# Pokedéx MERN app.

Web Development 2, Spring 2021.

By Easton Pillay, Zach Rosin, and Johnathan Tucker.


This is a MERN app that implements a fully fledged pokedex like you would see on an official site. It's main functions are the main page which displays all pokemon in pages, with a search bar to find specific pokemon, the detailed page which shows more information on the pokemon, and the team builder page which allows you to create a team and the site analyzes the team composition and gives you a report of strengths and weaknesses.

Google Doc Project proposal: https://docs.google.com/document/d/1NO6_h6G2KTTSbKVz10bbOxxJ-reTcxLTnIJsB-N_WNo/edit?usp=sharing
Notes on project proposal:
- The extra team builder is much larger than we anticipated. It alone is probably as much or more of the code than the rest of the react and api, in addition to the couple hundred thousands of lines of data it requires.
-  We did drop the idea for adding sound, as the images were more than complicated for us, and we were not fond of the idea of using the sound resource if we weren't caching in our own DB.


Easton - 40:
- db side user auth
- db overhaul(adding 800 more pokemon to test data, adding moves and abilities)
- react setup
- team builder logic
- Moveset table for details page.
- Added API routes for new collections.
- Did GitHub merges (hey, I thought those were hard) and code cleanup (not that much was necessary).


Johnathan - 30:
- react side user auth
- detailed info page
- get/post/put react pages.
- creating image function to pass user auth headers



Zach - 30:
- fixed, edited, and added api routes.
- db side images implementation
- react main page
- search bar implementation using mongoose-fuzzy-searching
- react team builder
- most styling


# Notes:
- Easton did much harder elements to the project so we are going to give him slightly more credit. The amount of time was roughly equal, Easton was just more effiecient with it.
- We have some pull requests to show partially completed code without affecting main, relating to team backend which is only 90% done.
- Team backend is fully implimented except for the ability to change pokemon or selected moves, which could take another day or two to implement, and we don't think that 1 section is worth 20% off to get working.


# Technical note

You may notice in our React front end, all of our API calls don't have hostnames! Consider this one from App.js:

```
async function authenticate() {
        const response = await fetch("/api/user/auth", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },      
          body: JSON.stringify({ 
             username: UserName,
             password: PassWord })
        }).then(r => r.json());
```

You may say, huh? Well, Create React App includes a really cool thing called the [proxy option](https://create-react-app.dev/docs/proxying-api-requests-in-development/) where it will proxy all requests that it can't handle to another server, in this case our backend server running on port 8000. This means that we don't have to have some kind of weird build time option where our all of our API request urls are changed to whatever they will need to be in production, but instead, the React app just assumes the API is running on the same origin. 

This also means our app builds, and will run if you copy the files from the frontend/build folder into the static directory of the API server. Or, even better, if you have Docker installed, you can do `docker-compose up` and watch as it comes to life on port 8000. I did this to ensure we didn't have any dependencies missing from package.json or odd bugs from one of us having a different database init script, etc. Of course, CORS is still implemented if you want to run them separately.
