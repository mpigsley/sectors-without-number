const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

const BATCH_SIZE = 250;
const SECTOR_LIMIT = 10;
const ENTITY_TYPES = [
  'asteroidBase',
  'asteroidBelt',
  'blackHole',
  'deepSpaceStation',
  'gasGiantMine',
  'moon',
  'moonBase',
  'note',
  'orbitalRuin',
  'planet',
  'refuelingStation',
  'researchBase',
  'sector',
  'spaceStation',
  'system',
];

module.exports = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );
  }

  const { sectorId, entities } = data || {};
  if (!sectorId && (!entities || !_.size(entities.sector))) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'To save entities a new sector must exist or an existing sector should be given.'
    );
  }

  return admin
    .firestore()
    .collection('entities')
    .doc('sector')
    .collection('entity')
    .where('creator', '==', context.auth.uid)
    .get()
    .then(snapshot => {
      let activeSectorCount = 0;
      snapshot.forEach(doc => {
        const sectorData = doc.data();
        if (!sectorData.deleted) {
          activeSectorCount += 1;
        }
      });
      if (activeSectorCount >= SECTOR_LIMIT) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'You have reached your limit on total number of sectors.',
          { limit: SECTOR_LIMIT }
        );
      }

      const allKeys = _.flatten(_.values(_.map(entities, Object.keys)));
      const mapping = {};
      const batches = [admin.firestore().batch()];
      let batchCount = 0;
      let batchIndex = 0;

      const saveEntityTree = (parentId, newParentId, thisSectorId) => {
        _.forEach(
          _.pick(entities, ...ENTITY_TYPES),
          (entityTypes, entityType) =>
            _.forEach(entityTypes, (entity, oldId) => {
              if (
                parentId !== entity.parent &&
                (parentId || _.includes(allKeys, entity.parent))
              ) {
                return Promise.resolve();
              }

              const timestamp = admin.firestore.FieldValue.serverTimestamp();
              const savableEntity = {
                ...entity,
                creator: context.auth.uid,
                created: timestamp,
                updated: timestamp,
              };
              if (newParentId) {
                savableEntity.parent = newParentId;
                savableEntity.sector = thisSectorId;
              }
              const newRef = admin
                .firestore()
                .collection('entities')
                .doc(entityType)
                .collection('entity')
                .doc();
              batches[batchIndex].set(newRef, savableEntity);
              batchCount += 1;
              if (batchCount === BATCH_SIZE) {
                batches.push(admin.firestore().batch());
                batchIndex += 1;
                batchCount = 0;
              }
              mapping[oldId] = newRef.id;
              let savableSectorId = thisSectorId || sectorId;
              if (entityType === 'sector') {
                savableSectorId = newRef.id;
              }
              return saveEntityTree(oldId, newRef.id, savableSectorId);
            })
        );
      };

      saveEntityTree();

      return Promise.all(batches.map(batch => batch.commit())).then(() => ({
        mapping,
      }));
    })
    .catch(error => {
      throw error.code === 'permission-denied'
        ? error
        : new functions.https.HttpsError('unknown', error.message, error);
    });
});
