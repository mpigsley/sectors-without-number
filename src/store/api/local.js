import localForage from 'localforage';
import { flatten, map, mapKeys } from 'lodash';

export const setEntity = (entity, key) => localForage.setItem(key, entity);
export const setEntities = entities =>
  Promise.all(
    map(
      Object.assign(
        ...flatten(
          map(entities, (list, type) =>
            mapKeys(list, (_, id) => `${type}.${id}`),
          ),
        ),
      ),
      setEntity,
    ),
  );
export const getEntities = () =>
  new Promise((resolve, reject) => {
    const entities = {};
    localForage
      .iterate((entity, key) => {
        const [entityType, entityId] = key.split('.');
        entities[entityType] = entities[entityType] || {};
        entities[entityType][entityId] = entity;
      })
      .then(() => {
        resolve(entities);
      })
      .catch(reject);
  });
export const deleteEntity = key => localForage.removeItem(key);
export const deleteEntities = entities =>
  Promise.all(
    flatten(map(entities, (list, type) => list.map(id => `${type}.${id}`))).map(
      deleteEntity,
    ),
  );
export const clearLocalDatabase = () => localForage.clear();
