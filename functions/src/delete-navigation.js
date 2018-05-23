const functions = require('firebase-functions');
const admin = require('firebase-admin');

const BATCH_SIZE = 500;
const deleteRoutesBatch = (query, resolve, reject) =>
  query
    .limit(BATCH_SIZE)
    .get()
    .then(snapshot => {
      if (snapshot.size === 0) {
        return 0;
      }
      const batch = admin.firestore().batch();
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      return batch.commit().then(() => snapshot.size);
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        return resolve();
      }
      return process.nextTick(() => {
        deleteRoutesBatch(query, resolve, reject);
      });
    })
    .catch(reject);

module.exports = functions.firestore
  .document('entities/sector/entity/{sectorId}')
  .onDelete((snapshot, context) => {
    const { sectorId } = context.params;

    const query = admin
      .firestore()
      .collection('navigation')
      .doc(sectorId)
      .collection('routes');

    return new Promise((resolve, reject) =>
      deleteRoutesBatch(query, resolve, reject)
    ).catch(
      error => new functions.https.HttpsError('unknown', error.message, error)
    );
  });
