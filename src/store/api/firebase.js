import { auth as FirebaseAuth, firestore as Firestore } from 'firebase';
import { size, values, map, forEach, flatten, includes } from 'lodash';

import Entities from 'constants/entities';
import { coordinatesFromKey } from 'utils/common';

export const getCurrentUser = () =>
  new Promise(resolve => {
    console.log('here');
    FirebaseAuth().onAuthStateChanged(user => {
      if (!(user || {}).uid) {
        return resolve(null);
      }
      return Firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            resolve({ ...doc.data(), ...user.toJSON() });
          }
          resolve(user.toJSON());
        });
    });
  });

export const getUserData = uid =>
  Firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return null;
      }
      return doc.data();
    });

export const updateCurrentUser = (uid, { displayName, ...rest }) => {
  if (!uid) {
    return new Error('Uid required to update a user.');
  }
  const promises = [FirebaseAuth().currentUser.updateProfile({ displayName })];
  if (size(rest)) {
    promises.push(
      Firestore()
        .collection('users')
        .doc(uid)
        .set(rest, { merge: true }),
    );
  }
  return Promise.all(promises);
};

export const doFacebookLogin = () => {
  const provider = new FirebaseAuth.FacebookAuthProvider();
  return FirebaseAuth().signInWithPopup(provider);
};

export const doGoogleLogin = () => {
  const provider = new FirebaseAuth.GoogleAuthProvider();
  return FirebaseAuth().signInWithPopup(provider);
};

export const doSignup = (email, password) =>
  FirebaseAuth().createUserWithEmailAndPassword(email, password);

export const doLogin = (email, password) =>
  FirebaseAuth().signInWithEmailAndPassword(email, password);

export const doLogout = () => FirebaseAuth().signOut();

export const doPasswordReset = email =>
  FirebaseAuth().sendPasswordResetEmail(email);

export const uploadEntities = (entities, uid, sectorId) => {
  if (!sectorId && !size(entities[Entities.sector.key])) {
    throw new Error(
      'To save entities a new sector must exist or an existing sector should be given',
    );
  }

  const allKeys = flatten(values(map(entities, Object.keys)));
  const keyMapping = {};
  const batches = [Firestore().batch()];
  let batchCount = 0;
  let batchIndex = 0;

  const saveEntityTree = (parentId, newParentId, thisSectorId) => {
    forEach(entities, (entityTypes, entityType) =>
      forEach(entityTypes, (entity, oldId) => {
        if (
          parentId !== entity.parent &&
          (parentId || includes(allKeys, entity.parent))
        ) {
          return Promise.resolve();
        }

        const timestamp = Firestore.FieldValue.serverTimestamp();
        const savableEntity = {
          ...entity,
          creator: uid,
          created: timestamp,
          updated: timestamp,
        };
        if (newParentId) {
          savableEntity.parent = newParentId;
          savableEntity.sector = thisSectorId;
        }
        const newRef = Firestore()
          .collection('entities')
          .doc(entityType)
          .collection('entity')
          .doc();
        batches[batchIndex].set(newRef, savableEntity);
        batchCount += 1;
        if (batchCount === 500) {
          batches.push(Firestore().batch());
          batchIndex += 1;
          batchCount = 0;
        }
        keyMapping[oldId] = newRef.id;
        let savableSectorId = thisSectorId || sectorId;
        if (entityType === Entities.sector.key) {
          savableSectorId = newRef.id;
        }
        return saveEntityTree(oldId, newRef.id, savableSectorId);
      }),
    );
  };

  saveEntityTree();

  return Promise.all(batches.map(batch => batch.commit())).then(() => ({
    mapping: keyMapping,
  }));
};

export const getSyncedSectors = uid => {
  let entities = {};
  return Promise.all(
    map(Entities, ({ key }) =>
      Firestore()
        .collection('entities')
        .doc(key)
        .collection('entity')
        .where('creator', '==', uid)
        .get()
        .then(typeSnapshot => {
          typeSnapshot.forEach(doc => {
            entities = {
              ...entities,
              [key]: {
                ...entities[key],
                [doc.id]: doc.data(),
              },
            };
          });
        }),
    ),
  ).then(() => entities);
};

export const getCurrentSector = (sectorId, uid) => {
  let entities = {};
  return Firestore()
    .collection('entities')
    .doc(Entities.sector.key)
    .collection('entity')
    .doc(sectorId)
    .get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        if (data.creator !== uid) {
          entities[Entities.sector.key] = {
            [doc.id]: data,
          };
          return Promise.all(
            map(Entities, ({ key }) =>
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
          ).then(() => entities);
        }
      }
      return entities;
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
  const oldSectorBatch = Firestore().batch();
  const batches = [Firestore().batch()];
  let batchCount = 0;
  let batchIndex = 0;
  const promises = [];
  forEach(entities, (entityIds, entityType) =>
    entityIds.forEach(entityId => {
      if (entityType === Entities.sector.key) {
        promises.push(
          Firestore()
            .collection('sectors')
            .doc(entityId)
            .get()
            .then(doc => {
              if (doc.exists) {
                oldSectorBatch.delete(
                  Firestore()
                    .collection('sectors')
                    .doc(entityId),
                );
              }
            }),
        );
      }
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
    Promise.all([
      ...batches.map(batch => batch.commit()),
      oldSectorBatch.commit(),
    ]),
  );
};

export const convertOldSectors = ({ uid, onConvert, onComplete }) =>
  Promise.all([
    Firestore()
      .collection('sectors')
      .where('creator', '==', uid)
      .get(),
    Firestore()
      .collection('entities')
      .doc(Entities.sector.key)
      .collection('entity')
      .where('creator', '==', uid)
      .get(),
  ]).then(([snapshot, entitySnapshot]) => {
    const promises = [];
    const timestamp = Firestore.FieldValue.serverTimestamp();
    const common = { updated: timestamp, created: timestamp, creator: uid };
    const entities = {};
    const syncedEntities = [];

    entitySnapshot.forEach(doc => syncedEntities.push(doc.id));

    let hasStarted = false;

    snapshot.forEach(doc => {
      const sector = doc.data();
      const batch = Firestore().batch();

      if (includes(syncedEntities, doc.id)) {
        return;
      }

      if (!hasStarted) {
        onConvert();
        hasStarted = true;
      }

      // Systems & Planets
      forEach(sector.systems || {}, system => {
        const systemRef = Firestore()
          .collection('entities')
          .doc(Entities.system.key)
          .collection('entity')
          .doc();
        const systemObj = {
          ...common,
          sector: doc.id,
          name: system.name,
          parent: doc.id,
          parentEntity: Entities.sector.key,
          ...coordinatesFromKey(system.key),
        };
        batch.set(systemRef, systemObj);
        entities[Entities.system.key] = {
          ...(entities[Entities.system.key] || {}),
          [systemRef.id]: systemObj,
        };

        forEach(system.planets || {}, planet => {
          const planetRef = Firestore()
            .collection('entities')
            .doc(Entities.planet.key)
            .collection('entity')
            .doc();
          const planetObj = {
            ...common,
            sector: doc.id,
            name: planet.name,
            parent: systemRef.id,
            parentEntity: Entities.system.key,
            attributes: {
              atmosphere: planet.atmosphere,
              biosphere: planet.biosphere,
              population: planet.population,
              tags: planet.tags,
              techLevel: planet.techLevel,
              temperature: planet.temperature,
            },
          };
          batch.set(planetRef, planetObj);
          entities[Entities.planet.key] = {
            ...(entities[Entities.planet.key] || {}),
            [planetRef.id]: planetObj,
          };
        });
      });

      // Sector
      const sectorRef = Firestore()
        .collection('entities')
        .doc(Entities.sector.key)
        .collection('entity')
        .doc(doc.id);
      const sectorObj = {
        ...common,
        rows: sector.rows,
        columns: sector.columns,
        name: sector.name,
        created: sector.created || timestamp,
        sector: doc.id,
      };
      batch.set(sectorRef, sectorObj);
      entities[Entities.sector.key] = {
        ...(entities[Entities.sector.key] || {}),
        [doc.id]: sectorObj,
      };

      promises.push(batch.commit());
    });

    return Promise.all(promises).then(() => {
      if (promises.length) {
        onComplete();
      }
      return entities;
    });
  });
