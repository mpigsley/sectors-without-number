const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sectorCounter = functions.firestore
  .document('entities/sector/entity/{entityId}')
  .onWrite(change => {
    const { creator } = change.after.exists
      ? change.after.data()
      : change.before.data();

    return admin
      .firestore()
      .collection('entities')
      .doc('sector')
      .collection('entity')
      .where('creator', '==', creator)
      .get()
      .then(snapshot =>
        admin
          .firestore()
          .collection('users')
          .doc(creator)
          .set({ sectors: snapshot.size }, { merge: true })
      );
  });
