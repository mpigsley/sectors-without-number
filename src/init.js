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
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
  });

  store.dispatch(fetchUser());

  Fastclick();
};
