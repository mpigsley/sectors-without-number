import localForage from 'localforage';
import { flatten, map, mapKeys, size } from 'lodash';

import Entities from 'constants/entities';
import { createId, coordinatesFromKey } from 'utils/common';

export const clearLocalDatabase = () => localForage.clear();

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

export const convertOldSectors = oldSectors =>
  Promise.all(
    map(oldSectors, (sector, sectorId) =>
      Promise.all([
        setEntity(
          {
            name: sector.name,
            columns: sector.columns,
            rows: sector.rows,
          },
          `${Entities.sector.key}.${sectorId}`,
        ),
        Promise.all(
          map(sector.systems, (system, systemKey) => {
            const systemId = createId();
            return Promise.all([
              setEntity(
                {
                  name: system.name,
                  parent: sectorId,
                  parentEntity: Entities.sector.key,
                  sector: sectorId,
                  ...coordinatesFromKey(systemKey),
                },
                `${Entities.system.key}.${systemId}`,
              ),
              Promise.all(
                map(system.planets, planet =>
                  Promise.all([
                    setEntity(
                      {
                        name: planet.name,
                        parent: systemId,
                        parentEntity: Entities.system.key,
                        sector: sectorId,
                        attributes: {
                          atmosphere: planet.atmosphere,
                          biosphere: planet.biosphere,
                          population: planet.population,
                          tags: planet.tags,
                          techLevel: planet.techLevel,
                          temperature: planet.temperature,
                        },
                      },
                      `${Entities.planet.key}.${createId()}`,
                    ),
                  ]),
                ),
              ),
            ]);
          }),
        ),
      ]),
    ),
  );

export const getEntities = () =>
  new Promise((resolve, reject) => {
    const entities = {};
    const oldSectors = {};
    localForage
      .iterate((entity, key) => {
        if (key.indexOf('.') < 0) {
          oldSectors[key] = entity;
        } else {
          const [entityType, entityId] = key.split('.');
          entities[entityType] = entities[entityType] || {};
          entities[entityType][entityId] = entity;
        }
      })
      .then(() => {
        if (!size(oldSectors)) {
          return resolve(entities);
        }
        return clearLocalDatabase()
          .then(() => convertOldSectors(oldSectors))
          .then(() =>
            localForage
              .iterate((entity, key) => {
                const [entityType, entityId] = key.split('.');
                entities[entityType] = entities[entityType] || {};
                entities[entityType][entityId] = entity;
              })
              .then(() => resolve(entities)),
          );
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
