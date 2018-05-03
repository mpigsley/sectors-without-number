const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

admin.initializeApp();

exports.saveEntities = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );
  }

  const { sectorId, entities } = data || {};
  if (!sectorId && (!entities || !_.size(entities.sector))) {
    throw new functions.HttpsError(
      'invalid-argument',
      'To save entities a new sector must exist or an existing sector should be given.'
    );
  }

  const allKeys = _.flatten(_.values(_.map(entities, Object.keys)));
  const mapping = {};
  const batches = [admin.firestore().batch()];
  let batchCount = 0;
  let batchIndex = 0;

  const saveEntityTree = (parentId, newParentId, thisSectorId) => {
    _.forEach(entities, (entityTypes, entityType) =>
      _.forEach(entityTypes, (entity, oldId) => {
        if (
          parentId !== entity.parent &&
          (parentId || _.includes(allKeys, entity.parent))
        ) {
          return Promise.resolve();
        }

        const timestamp = admin.firestore.FieldValue.serverTimestamp();
        const savableEntity = Object.assign({}, entity, {
          creator: context.auth.uid,
          created: timestamp,
          updated: timestamp,
        });
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
        if (batchCount === 500) {
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
});
