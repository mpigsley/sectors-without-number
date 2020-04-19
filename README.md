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
3.  Create a [firebase project](https://console.firebase.google.com/)
4.  Create a Firestore Database (make sure it's of the "Cloud Firestore" database type.)
5.  Create a web application (checking the box for "Also set up Firebase Hosting ...")
6.  Navigate to "Project Overview" -> "Project Settings" -> scroll down to "Your apps" -> "Firebase SDK Snippet" -> click the "config" radio button and use the values displayed in `firebaseConfig` to fill out the values required in the `.env` file created in step 2 (be aware these values do not need to be closed with quotation marks in the `.env` file)
7.  Ensure you enable authentication by navigating to "Develop" -> "Authentication" -> click "Set up sign-in method" -> choose a preferred auth provider (or use  email + password)
8.  `node_modules/.bin/firebase login` or use your global firebase instance if you installed it globally (you might have to follow the google auth flow to authorize the firebase CLI)
9.  `node_modules/.bin/firebase use --add` and select the project you configured in the firebase console.
10.  `npm run deploy:functions` to setup the cloud functions.
11.  `npm run deploy` must be run at least once to create necessary configuration / rules files (also ships the app to firebase)
12.  `npm start` to host the app locally

### Deploying to Firebase

After you've logged into firebase and selected the project from the CLI, you can deploy by simply running `npm run deploy`.

## Internationalization

Translations for all the strings on the site are [in a google sheet](https://docs.google.com/spreadsheets/d/162lUcFa6cZdEy3hHQGqMRlgHNhTTL-szWexLtdpLllY/edit?usp=sharing). If you would like to help out just request access and tell me what language you'd like to work on.

### Convert GDrive spreadsheet into intl files

1.  Use ExportSheetData plugin (https://github.com/Synthoid/ExportSheetData) to export json from google sheets
2.  Drop the downloaded file into the project's base directory
3.  `npm run translate`, which will take this file and get the translations where they need to be
