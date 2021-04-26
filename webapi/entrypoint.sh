#!/bin/bash

# This script is for if we run the project in Docker (which I, Easton, do sometimes during testing to make sure that I've been committing the right stuff to the repo.)
# It ensures the database gets set up when the project runs the first time.
if [ ! -f /databaseInitialized ]; then
    npm run init
    touch /databaseInitialized
fi
npm start
