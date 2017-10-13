import localForage from 'localforage';
import Firebase from 'firebase';
import Fastclick from 'react-fastclick';

import { setAuthUser } from 'store/actions/user.actions';
import { setSavedSectors } from 'store/actions/sector.actions';
import { getCurrentUser } from 'store/api';

export default store => {
  new Promise((resolve, reject) => {
    const savedSectors = {};
    localForage
      .iterate((value, key) => {
        savedSectors[key] = value;
      })
      .then(() => resolve(savedSectors))
      .catch(reject);
  }).then(saved => {
    store.dispatch(setSavedSectors(saved));
  });

  Firebase.initializeApp({
    apiKey: 'AIzaSyDd9dgs7P1HA8EqW5yE8C2B7TLeYLTP6f4',
    authDomain: 'sector-io-23cec.firebaseapp.com',
    databaseURL: 'https://sector-io-23cec.firebaseio.com',
    projectId: 'sector-io-23cec',
    storageBucket: 'sector-io-23cec.appspot.com',
    messagingSenderId: '189524790637',
  });

  getCurrentUser().then(user => {
    if (user) {
      store.dispatch(setAuthUser(user));
    }
  });

  Fastclick();
};
