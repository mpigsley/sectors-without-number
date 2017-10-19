import Firebase from 'firebase';
import Fastclick from 'react-fastclick';

import { getSectors } from 'store/api/local';
import { fetchUser } from 'store/actions/user.actions';
import { setSavedSectors } from 'store/actions/sector.actions';

export default store => {
  getSectors().then(saved => {
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

  store.dispatch(fetchUser());

  Fastclick();
};
