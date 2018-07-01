import Firebase from 'firebase/app';
import { size } from 'constants/lodash';

export const getCurrentUser = () =>
  new Promise(resolve => {
    Firebase.auth().onAuthStateChanged(user => {
      if (!(user || {}).uid) {
        return resolve(null);
      }
      return Firebase.firestore()
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
  Firebase.firestore()
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
  const promises = [Firebase.auth().currentUser.updateProfile({ displayName })];
  if (size(rest)) {
    promises.push(
      Firebase.firestore()
        .collection('users')
        .doc(uid)
        .set(rest, { merge: true }),
    );
  }
  return Promise.all(promises);
};

export const doFacebookLogin = () => {
  const provider = new Firebase.auth.FacebookAuthProvider();
  return Firebase.auth().signInWithPopup(provider);
};

export const doGoogleLogin = () => {
  const provider = new Firebase.auth.GoogleAuthProvider();
  return Firebase.auth().signInWithPopup(provider);
};

export const doSignup = (email, password) =>
  Firebase.auth().createUserWithEmailAndPassword(email, password);

export const doLogin = (email, password) =>
  Firebase.auth().signInWithEmailAndPassword(email, password);

export const doLogout = () => Firebase.auth().signOut();

export const doPasswordReset = email =>
  Firebase.auth().sendPasswordResetEmail(email);
