#!/bin/bash

#Clean out and reset db
cat ~/Documents/Programing/goodMorningAnna/server/tests/cleardb.sql | psql -d goodmorninganna;
cat ~/Documents/Programing/goodMorningAnna/server/tests/schema.sql | psql -d goodmorninganna;

#Run unit tests
mocha unit.js
