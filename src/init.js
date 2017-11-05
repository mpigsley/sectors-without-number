import Firebase from 'firebase';
import Fastclick from 'react-fastclick';
import 'firebase/firestore';

import { getLocalSectors } from 'store/api/local';
import {
  getCurrentUser,
  getCurrentSector,
  getSyncedSectors,
} from 'store/api/firebase';
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
      const currentSectorPromise = location.pathname.startsWith('/sector')
        ? getCurrentSector(location.pathname.split('/')[2])
        : Promise.resolve();
      Promise.all([
        getCurrentUser(),
        getLocalSectors(),
        currentSectorPromise,
      ]).then(([user, local, currentSector]) => {
        const promise = user ? getSyncedSectors(user.uid) : Promise.resolve();
        return promise.then(synced =>
          store.dispatch(initialize({ local, user, synced, currentSector })),
        );
      });
    }
  });

  Fastclick();
};
