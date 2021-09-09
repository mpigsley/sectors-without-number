import Firebase from 'firebase/app';

import { omit, map, forEach } from 'constants/lodash';
import Entities from 'constants/entities';

export const uploadEntities = (entities, sectorId) =>
  Firebase.functions()
    .httpsCallable('saveEntities')({ sectorId, entities })
    .then(({ data }) => data);

export const getSyncedSectors = (uid) =>
  Firebase.firestore()
    .collection('entities')
    .doc(Entities.sector.key)
    .collection('entity')
    .where('creator', '==', uid)
    .get()
    .then((typeSnapshot) => {
      let sectors = {};
      typeSnapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.deleted) {
          sectors = { ...sectors, [doc.id]: data };
        }
      });
      return sectors;
    });

export const getSectorEntities = (sectorId, uid) => {
  let entities;
  return Firebase.firestore()
    .collection('entities')
    .doc(Entities.sector.key)
    .collection('entity')
    .doc(sectorId)
    .get()
    .then((doc) => {
      const data = doc.exists ? doc.data() : undefined;
      if (!data || data.deleted) {
        return { entities };
      }
      entities = {
        [Entities.sector.key]: { [doc.id]: data },
      };
      return Promise.all(
        map(omit(Entities, Entities.sector.key), ({ key }) =>
          Firebase.firestore()
            .collection('entities')
            .doc(key)
            .collection('entity')
            .where('sector', '==', sectorId)
            .get()
            .then((typeSnapshot) => {
              typeSnapshot.forEach((typeDoc) => {
                entities = {
                  ...entities,
                  [key]: {
                    ...entities[key],
                    [typeDoc.id]: typeDoc.data(),
                  },
                };
              });
            }),
        ),
      ).then(() => ({
        entities,
        share: data.creator !== uid ? sectorId : undefined,
      }));
    });
};

export const updateEntity = (entityId, entityType, update) =>
  Firebase.firestore()
    .collection('entities')
    .doc(entityType)
    .collection('entity')
    .doc(entityId)
    .set(update, { merge: true });

export const updateEntities = (entities) => {
  const batch = Firebase.firestore().batch();
  forEach(entities, (entityUpdates, entityType) =>
    forEach(entityUpdates, (update, entityId) =>
      batch.update(
        Firebase.firestore()
          .collection('entities')
          .doc(entityType)
          .collection('entity')
          .doc(entityId),
        {
          ...update,
          updated: Firebase.firestore.FieldValue.serverTimestamp(),
        },
      ),
    ),
  );
  return batch.commit();
};

export const deleteSector = (sectorId) =>
  Firebase.firestore()
    .collection('entities')
    .doc(Entities.sector.key)
    .collection('entity')
    .doc(sectorId)
    .set(
      { deleted: Firebase.firestore.FieldValue.serverTimestamp() },
      { merge: true },
    );

const BATCH_SIZE = 250;
export const deleteEntities = (entities) => {
  const batches = [Firebase.firestore().batch()];
  let batchCount = 0;
  let batchIndex = 0;
  const promises = [];
  forEach(entities, (entityIds, entityType) =>
    entityIds.forEach((entityId) => {
      batches[batchIndex].delete(
        Firebase.firestore()
          .collection('entities')
          .doc(entityType)
          .collection('entity')
          .doc(entityId),
      );
      batchCount += 1;
      if (batchCount === BATCH_SIZE) {
        batches.push(Firebase.firestore().batch());
        batchIndex += 1;
        batchCount = 0;
      }
    }),
  );
  return Promise.all(promises).then(() =>
    Promise.all(batches.map((batch) => batch.commit())),
  );
};
