import Firebase from 'firebase';
import Fastclick from 'react-fastclick';
import 'firebase/firestore';

import { initialize } from 'store/actions/user.actions';

export default store => {
  Firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
  });

  const unsubscribe = store.subscribe(() => {
    const location = store.getState().routing.locationBeforeTransitions;
    if (location) {
      unsubscribe();
      store.dispatch(initialize(location));
    }
  });

  Fastclick();
};
