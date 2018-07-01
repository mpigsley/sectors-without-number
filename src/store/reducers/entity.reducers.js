import { LOCATION_CHANGE } from 'react-router-redux';

import {
  includes,
  uniq,
  mapValues,
  mapKeys,
  omit,
  keys,
  pick,
  pickBy,
} from 'constants/lodash';
import Entities from 'constants/entities';
import {
  UPDATED_ENTITIES,
  DELETED_ENTITIES,
  UPDATED_ID_MAPPING,
} from 'store/actions/entity.actions';
import {
  INITIALIZED,
  FETCHED_SECTOR,
  CREATED_LAYER,
} from 'store/actions/combined.actions';
import { LOGGED_IN, LOGGED_OUT } from 'store/actions/user.actions';
import { mergeEntityUpdates } from 'utils/entity';

const initialState = {
  models: mapValues(Entities, () => ({})),
  saved: [],
  share: null,
  currentSector: null,
  currentEntityType: null,
  currentEntity: null,
};

export default function entity(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED:
      return {
        ...state,
        models: mergeEntityUpdates(state.models, action.entities),
        saved: action.saved,
        share: action.share,
      };
    case UPDATED_ENTITIES:
      return {
        ...state,
        models: mergeEntityUpdates(state.models, action.entities),
      };
    case FETCHED_SECTOR:
      return {
        ...state,
        share: action.share,
        models: mergeEntityUpdates(state.models, action.entities),
      };
    case LOGGED_IN:
      return {
        ...state,
        models: mergeEntityUpdates(initialState.models, {
          [Entities.sector.key]: action.sectors,
        }),
        saved: keys(action.sectors || {}),
        share: null,
      };
    case LOCATION_CHANGE: {
      const { pathname } = action.payload;
      const isGameView =
        pathname.startsWith('/sector/') || pathname.startsWith('/overview/');
      const currentSector = isGameView ? pathname.split('/')[2] : null;
      const uniqSectors = uniq([...state.saved, currentSector]).filter(s => s);
      return {
        ...state,
        currentSector,
        share:
          isGameView && includes(uniqSectors, state.share) ? state.share : null,
        currentEntityType: isGameView ? pathname.split('/')[3] : null,
        currentEntity: isGameView ? pathname.split('/')[4] : null,
        models: mapValues(state.models, (entities, entityType) => {
          if (entityType === Entities.sector.key) {
            return pick(entities, ...uniqSectors);
          }
          return pickBy(entities, ({ sector }) =>
            includes(uniqSectors, sector),
          );
        }),
      };
    }
    case UPDATED_ID_MAPPING: {
      const transformedSector = action.mapping[state.currentSector];
      return {
        ...state,
        currentSector: transformedSector || state.currentSector,
        currentEntity:
          action.mapping[state.currentEntity] || state.currentEntity,
        saved: uniq([
          ...state.saved.map(saveId => action.mapping[saveId] || saveId),
          transformedSector,
        ]).filter(s => s),
        models: mapValues(state.models, entities =>
          mapValues(
            mapKeys(entities, (_, key) => action.mapping[key] || key),
            entityObj => {
              const sector =
                action.mapping[entityObj.sector] || entityObj.sector;
              let update = { ...entityObj };
              if (sector) {
                update = { ...update, sector };
              }
              const parent =
                action.mapping[entityObj.parent] || entityObj.parent;
              if (parent) {
                update = { ...update, parent };
              }
              return update;
            },
          ),
        ),
      };
    }
    case DELETED_ENTITIES: {
      const deletedSectorIds = action.entities[Entities.sector.key] || [];
      return {
        ...state,
        saved: state.saved.filter(
          saveId => deletedSectorIds.indexOf(saveId) < 0,
        ),
        models: {
          ...state.models,
          ...mapValues(action.entities, (entityIds, entityType) =>
            omit(state.models[entityType], entityIds),
          ),
        },
      };
    }
    case CREATED_LAYER: {
      return {
        ...state,
        models: {
          ...state.models,
          [Entities.sector.key]: {
            ...state.models[Entities.sector.key],
            [action.sectorId]: {
              ...state.models[Entities.sector.key][action.sectorId],
              layers: action.layers,
            },
          },
        },
      };
    }
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}
