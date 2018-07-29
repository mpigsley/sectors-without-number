const admin = require('firebase-admin');

const saveEntities = require('./src/save-entities');
const deleteSectorObjects = require('./src/delete-sector-objects');

admin.initializeApp();

admin.firestore().settings({ timestampsInSnapshots: true });

exports.saveEntities = saveEntities;
exports.deleteSectorObjects = deleteSectorObjects;
