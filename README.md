# Sectors Without Number

A seeded, random, revised edition compliant, [stars without number](http://www.sinenomine-pub.com/?page_id=395) sector generator.

[![Build Status](https://travis-ci.org/mpigsley/sectors-without-number.svg?branch=master)](https://travis-ci.org/mpigsley/sectors-without-number)

## Feature Requests & Bugs

Feel free to [open an issue](https://github.com/mpigsley/sectors-without-number/issues/new) if there is a feature you'd like to see or something is broken. Pull requests are always welcome.

## Development

This project is purely a front-end application written in React + Redux.

To get started just install modules with `npm install` and run the application with `npm start`.

For more information see [create-react-app](https://github.com/facebookincubator/create-react-app).

## Possible Features

* Create login/signup workflow to save multiple sectors
* Create process to wire up sector manually (if the user wants to roll their own)
* Full customization (stars, planets, tags, etc.)
* Sector, planet, city, etc. notes
* Add asteroid fields to hex map
* More random generation
  * Moons (will dictate tides and habitability)
  * Cities (based on tech level and population)
  * Languages (create planet/city names based on language)
  * Exact Star/Planet Size
  * Planet Distance from Star (will dictate temperature/habitability of planet)
  * Planet/Star Rotation Period
* Sector travel tool
* Use WebGL to render a random 3D image of planet or moon
  * Add locations of major cities
  * Add secret location
  * Add way for user to add new locations to 3d view
