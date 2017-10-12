import { auth as FirebaseAuth } from 'firebase';

export const doFacebookLogin = () => {
  const provider = new FirebaseAuth.FacebookAuthProvider();
  return FirebaseAuth().signInWithPopup(provider);
};

export const doSignup = (email, password) => {};

export const doLogin = (email, password) => {};
