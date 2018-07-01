const admin = require('firebase-admin');

const saveEntities = require('./src/save-entities');
const deleteSectorObjects = require('./src/delete-sector-objects');

admin.initializeApp();

exports.saveEntities = saveEntities;
exports.deleteSectorObjects = deleteSectorObjects;
