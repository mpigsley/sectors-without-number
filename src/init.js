import Firebase from 'firebase';
import Fastclick from 'react-fastclick';
import 'firebase/firestore';
import { size } from 'lodash';

import { getEntities } from 'store/api/local';
import {
  getCurrentUser,
  getSyncedSectors,
  getCurrentSector,
  convertOldSectors,
} from 'store/api/firebase';
import { initialize } from 'store/actions/user.actions';
import { InfoToast, removeToastById } from 'utils/toasts';

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
    const path = store.getState().router.location.pathname;
    if (path) {
      unsubscribe();
      Promise.all([getCurrentUser(), getEntities()]).then(([user, local]) => {
        const { uid } = user || {};
        const sectorId = path.split('/')[2];
        const promises = [
          path.startsWith('/sector')
            ? getCurrentSector(sectorId, uid)
            : Promise.resolve(),
        ];
        if (uid) {
          promises.push(getSyncedSectors(uid));
          promises.push(
            convertOldSectors({
              uid,
              onComplete: () => store.dispatch(removeToastById('sync-toastr')),
              onConvert: () =>
                store.dispatch(
                  InfoToast({
                    title: 'Syncing Sectors',
                    message: 'Do not exit out of this web page.',
                    config: {
                      id: 'sync-toastr',
                      options: {
                        removeOnHover: false,
                        showCloseButton: false,
                        progressBar: false,
                      },
                    },
                  }),
                ),
            }),
          );
        }
        return Promise.all(promises).then(
          ([currentSector, onlySynced, converted]) => {
            const synced = size(onlySynced) ? onlySynced : converted;
            store.dispatch(initialize({ local, user, synced, currentSector }));
          },
        );
      });
    }
  });

  Fastclick();
};
