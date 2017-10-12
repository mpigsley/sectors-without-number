import { auth as FirebaseAuth } from 'firebase';

export const doFacebookLogin = () => {
  const provider = new FirebaseAuth.FacebookAuthProvider();
  return FirebaseAuth().signInWithPopup(provider);
};

export const getCurrentUser = () =>
  new Promise(resolve => {
    FirebaseAuth().onAuthStateChanged(user => {
      resolve(user ? user.toJSON() : null);
    });
  });
