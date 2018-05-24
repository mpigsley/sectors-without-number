const admin = require('firebase-admin');

const saveEntities = require('./src/save-entities');
const deleteNavigation = require('./src/delete-navigation');

admin.initializeApp();

exports.saveEntities = saveEntities;
exports.deleteNavigation = deleteNavigation;
