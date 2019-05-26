# Sectors Without Number

Revised edition compliant [Stars Without Number](http://www.sinenomine-pub.com/?page_id=395) sector generator.

[![Build Status](https://travis-ci.org/mpigsley/sectors-without-number.svg?branch=master)](https://travis-ci.org/mpigsley/sectors-without-number)

## Feature Requests & Bugs

Feel free to [open an issue](https://github.com/mpigsley/sectors-without-number/issues/new) if there is a feature you'd like to see or something is broken. Pull requests are always welcome.

## Development

This project is a front-end application written in React + Redux with a [Firebase](https://firebase.google.com/) backend. For more information see [create-react-app](https://github.com/facebookincubator/create-react-app).

### Getting Started

1.  `npm i` and `cd functions && npm i`
2.  `cp .env.example .env`
3.  Create a [firebase project](https://console.firebase.google.com/) and fill out `.env`.
4.  Ensure you enable authentication and the Firestore database in the web interface.
5.  `$(npm bin)/firebase login` or use your global firebase instance if you installed it globally.
6.  `$(npm bin)/firebase use --add` and select the project you configured in the firebase console.
7.  `npm run deploy:functions` to setup the cloud functions.
8.  `npm start`

### Deploying to Firebase

After you've logged into firebase and selected the project from the CLI, you can deploy by simply running `npm run deploy`.

## Internationalization

Translations for all the strings on the site are [in a google sheet](https://docs.google.com/spreadsheets/d/162lUcFa6cZdEy3hHQGqMRlgHNhTTL-szWexLtdpLllY/edit?usp=sharing). If you would like to help out just request access and tell me what language you'd like to work on.

### Convert GDrive spreadsheet into intl files

1.  Use ExportSheetData plugin (https://github.com/Synthoid/ExportSheetData) to export json from google sheets
2.  Drop the downloaded file into the project's base directory
3.  `npm run translate`, which will take this file and get the translations where they need to be
