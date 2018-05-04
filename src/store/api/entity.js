import { firestore as Firestore, functions as Functions } from 'firebase';
import { omit, map, forEach } from 'lodash';

import Entities from 'constants/entities';

export const uploadEntities = (entities, sectorId) =>
  Functions()
    .httpsCallable('saveEntities')({ sectorId, entities })
    .then(({ data }) => data);

export const getSyncedSectors = uid =>
  Firestore()
    .collection('entities')
    .doc(Entities.sector.key)
    .collection('entity')
    .where('creator', '==', uid)
    .get()
    .then(typeSnapshot => {
      let sectors = {};
      typeSnapshot.forEach(doc => {
        sectors = {
          ...sectors,
          [doc.id]: doc.data(),
        };
      });
      return sectors;
    });

export const getSectorEntities = (sectorId, uid) => {
  let entities = {};
  return Firestore()
    .collection('entities')
    .doc(Entities.sector.key)
    .collection('entity')
    .doc(sectorId)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return { entities };
      }
      const data = doc.data();
      entities[Entities.sector.key] = {
        [doc.id]: data,
      };
      return Promise.all(
        map(omit(Entities, Entities.sector.key), ({ key }) =>
          Firestore()
            .collection('entities')
            .doc(key)
            .collection('entity')
            .where('sector', '==', sectorId)
            .get()
            .then(typeSnapshot => {
              typeSnapshot.forEach(typeDoc => {
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
        sectorId,
        share: data.creator !== uid ? sectorId : undefined,
      }));
    });
};

export const updateEntities = entities => {
  const batch = Firestore().batch();
  forEach(entities, (entityUpdates, entityType) =>
    forEach(entityUpdates, (update, entityId) =>
      batch.update(
        Firestore()
          .collection('entities')
          .doc(entityType)
          .collection('entity')
          .doc(entityId),
        {
          ...update,
          updated: Firestore.FieldValue.serverTimestamp(),
        },
      ),
    ),
  );
  return batch.commit();
};

export const deleteEntities = entities => {
  const batches = [Firestore().batch()];
  let batchCount = 0;
  let batchIndex = 0;
  const promises = [];
  forEach(entities, (entityIds, entityType) =>
    entityIds.forEach(entityId => {
      batches[batchIndex].delete(
        Firestore()
          .collection('entities')
          .doc(entityType)
          .collection('entity')
          .doc(entityId),
      );
      batchCount += 1;
      if (batchCount === 500) {
        batches.push(Firestore().batch());
        batchIndex += 1;
        batchCount = 0;
      }
    }),
  );
  return Promise.all(promises).then(() =>
    Promise.all(batches.map(batch => batch.commit())),
  );
};
