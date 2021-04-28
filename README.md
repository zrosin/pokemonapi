# Pokedéx MERN app.

Web Development 2, Spring 2021.

By Easton Pillay, Zach Rosin, and Johnathan Tucker.


This is a MERN app that implements a fully fledged pokedex like you would see on an official site. It's main functions are the main page which displays all pokemon in pages, with a search bar to find specific pokemon, the detailed page which shows more information on the pokemon, and the team builder page which allows you to create a team and the site analyzes the team composition and gives you a report of strengths and weaknesses.

Google Doc Project proposal: https://docs.google.com/document/d/1NO6_h6G2KTTSbKVz10bbOxxJ-reTcxLTnIJsB-N_WNo/edit?usp=sharing
Notes on project proposal;
  The extra team builder is much larger than we anticipated. It alone is probably as much or more of the code than the rest of the react and api, in addition to the couple hundred thousands of lines of data it requires.
   We did drop the idea for adding sound, as the images were more than complicated for us, and we were not fond of the idea of using the sound resource if we weren't caching in our own DB.


Easton - 40:
db side user auth
db overhaul(adding 800 more pokemon to test data, adding moves and abilities)
react setup
team builder logic


Johnathan - 30:
react side user auth
detailed info page
get/post/put react pages - commented out by default



Zach - 30:
fixed, edited, and added api routes.
react main page
search bar implementation using mongoose-fuzzy-searching
react skeleton for team builder
most styling


Notes:
  Easton did much harder elements to the project so we are going to give him slightly more credit. The amount of time was roughly equal, Easton was just more effiecient with it.
