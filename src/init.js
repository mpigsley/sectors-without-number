import Firebase from 'firebase';
import Fastclick from 'react-fastclick';
import 'firebase/firestore';

import { getLocalSectors } from 'store/api/local';
import { getCurrentUser, getSyncedSectors } from 'store/api/firebase';
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

  Promise.all([getCurrentUser(), getLocalSectors()]).then(([user, local]) => {
    const promise = user ? getSyncedSectors(user.uid) : Promise.resolve();
    return promise.then(synced =>
      store.dispatch(initialize({ local, user, synced })),
    );
  });

  Fastclick();
};
