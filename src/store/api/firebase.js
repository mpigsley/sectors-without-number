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

export const uploadSector = sector => {
  const db = Firestore();
  return db
    .collection('sectors')
    .add({
      ...sector,
      created: Firestore.FieldValue.serverTimestamp(),
      updated: Firestore.FieldValue.serverTimestamp(),
    })
    .then(docRef => ({ [docRef.id]: sector }));
};

export const getSyncedSectors = userId => {
  const db = Firestore();
  return db
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
};

export const updateSyncedSector = (sectorId, key, value) => {
  const db = Firestore();
  return db
    .collection('sectors')
    .doc(key)
    .update({
      updated: Firestore.FieldValue.serverTimestamp(),
      [key]: value,
    });
};
