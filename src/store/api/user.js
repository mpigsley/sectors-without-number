import { auth as FirebaseAuth, firestore as Firestore } from 'firebase';
import size from 'lodash/size';

export const getCurrentUser = () =>
  new Promise(resolve => {
    FirebaseAuth().onAuthStateChanged(user => {
      if (!(user || {}).uid) {
        return resolve(null);
      }
      return Firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            resolve({ ...doc.data(), ...user.toJSON() });
          }
          resolve(user.toJSON());
        });
    });
  });

export const getUserData = uid =>
  Firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return null;
      }
      return doc.data();
    });

export const updateCurrentUser = (uid, { displayName, ...rest }) => {
  if (!uid) {
    return new Error('Uid required to update a user.');
  }
  const promises = [FirebaseAuth().currentUser.updateProfile({ displayName })];
  if (size(rest)) {
    promises.push(
      Firestore()
        .collection('users')
        .doc(uid)
        .set(rest, { merge: true }),
    );
  }
  return Promise.all(promises);
};

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
