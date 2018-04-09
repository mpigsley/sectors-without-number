const functions = require('firebase-functions');

exports.entities = functions.https.onCall((data, context) => {
  console.log(data);
  console.log(context.auth.uid);
});
