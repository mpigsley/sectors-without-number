import Firebase from 'firebase';
import Fastclick from 'react-fastclick';
import 'firebase/firestore';

import { getEntities } from 'store/api/local';
import {
  getCurrentUser,
  getSyncedSectors,
  getCurrentSector,
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
      Promise.all([getCurrentUser(), getEntities()]).then(([user, local]) => {
        let promises = [];
        if (user) {
          promises = [
            getSyncedSectors(user.uid),
            location.pathname.startsWith('/sector')
              ? getCurrentSector(location.pathname.split('/')[2], user.uid)
              : Promise.resolve(),
          ];
        }
        return Promise.all(promises).then(([synced, currentSector]) =>
          store.dispatch(initialize({ local, user, synced, currentSector })),
        );
      });
    }
  });

  Fastclick();
};
