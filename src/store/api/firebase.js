import { auth as FirebaseAuth, firestore as Firestore } from 'firebase';
import { size, values, map, flatten, includes } from 'lodash';

import Entities from 'constants/entities';

export const getCurrentUser = () =>
  new Promise(resolve => {
    FirebaseAuth().onAuthStateChanged(user => {
      resolve(user ? user.toJSON() : null);
    });
  });

export const updateCurrentUser = ({ displayName }) =>
  FirebaseAuth().currentUser.updateProfile({ displayName });

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

  let savableSectorId = sectorId;
  const allKeys = flatten(values(map(entities, Object.keys)));
  const keyMapping = {};
  const saveEntityTree = (parentId, newParentId) =>
    Promise.all(
      map(entities, (entityTypes, entityType) =>
        Promise.all(
          map(entityTypes, (entity, oldId) => {
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
              savableEntity.sector = savableSectorId;
            }
            return Firestore()
              .collection('entities')
              .doc(entityType)
              .collection('entity')
              .add(savableEntity)
              .then(docRef => {
                keyMapping[oldId] = docRef.id;
                if (entityType === Entities.sector.key) {
                  savableSectorId = docRef.id;
                }
                return saveEntityTree(oldId, docRef.id);
              });
          }),
        ),
      ),
    );

  return saveEntityTree().then(() => ({ mapping: keyMapping }));
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
          return entities;
        }),
    ),
  ).then(() => entities);
};

export const deleteEntities = entities =>
  Promise.all(
    map(entities, (entityIds, entityType) =>
      Promise.all(
        entityIds.map(entityId =>
          Firestore()
            .collection('entities')
            .doc(entityType)
            .collection('entity')
            .doc(entityId)
            .delete(),
        ),
      ),
    ),
  );
