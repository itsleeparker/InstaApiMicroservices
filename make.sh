#!/bin/bash
echo "Running Scripts";
git add .;
git commit -m " $1 ";
git push heroku master;
