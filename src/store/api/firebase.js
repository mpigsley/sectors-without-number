import { auth as FirebaseAuth, firestore as Firestore } from 'firebase';

export const getCurrentUser = () =>
  new Promise(resolve => {
    FirebaseAuth().onAuthStateChanged(user => {
      resolve(user ? user.toJSON() : null);
    });
  });

export const updateCurrentUser = ({ displayName }) =>
  FirebaseAuth().currentUser.updateProfile({ displayName });

export const doFacebookLogin = () => {
  const provider = new FirebaseAuth.FacebookAuthProvider();
  return FirebaseAuth().signInWithPopup(provider);
};

export const doGoogleLogin = () => {
  const provider = new FirebaseAuth.GoogleAuthProvider();
  return FirebaseAuth().signInWithPopup(provider);
};

export const doSignup = (email, password) =>
  FirebaseAuth().createUserWithEmailAndPassword(email, password);

export const doLogin = (email, password) =>
  FirebaseAuth().signInWithEmailAndPassword(email, password);

export const doLogout = () => FirebaseAuth().signOut();

export const doPasswordReset = email =>
  FirebaseAuth().sendPasswordResetEmail(email);

export const uploadSector = (sector, uid) =>
  Firestore()
    .collection('sectors')
    .add({
      ...sector,
      creator: uid,
      created: Firestore.FieldValue.serverTimestamp(),
      updated: Firestore.FieldValue.serverTimestamp(),
    })
    .then(docRef => docRef.update({ key: docRef.id }).then(() => docRef))
    .then(docRef => ({ ...sector, key: docRef.id }));

export const getSyncedSectors = userId =>
  Firestore()
    .collection('sectors')
    .where('creator', '==', userId)
    .get()
    .then(snapshot => {
      const synced = {};
      snapshot.forEach(doc => {
        synced[doc.id] = doc.data();
      });
      return synced;
    });

export const getCurrentSector = sectorId =>
  Firestore()
    .collection('sectors')
    .doc(sectorId)
    .get()
    .then(doc => (doc.exists ? doc.data() : undefined));

export const updateSyncedSector = (sectorId, sector) =>
  Firestore()
    .collection('sectors')
    .doc(sectorId)
    .update({
      ...sector,
      updated: Firestore.FieldValue.serverTimestamp(),
    });

export const removeSyncedSector = sectorId =>
  Firestore()
    .collection('sectors')
    .doc(sectorId)
    .delete();
