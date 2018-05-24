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
  UPDATE_ENTITIES,
  DELETE_ENTITIES,
  UPDATE_ID_MAPPING,
  FETCHED_SECTOR,
} from 'store/actions/entity.actions';
import { INITIALIZE, LOGGED_IN, LOGGED_OUT } from 'store/actions/user.actions';
import { mergeEntityUpdates } from 'utils/entity';

const initialState = {
  models: mapValues(Entities, () => ({})),
  saved: [],
  fetched: [],
  share: null,
  currentSector: null,
  currentEntityType: null,
  currentEntity: null,
};

export default function entity(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        models: mergeEntityUpdates(state.models, action.entities),
        fetched: uniq([...state.fetched, action.sectorId]).filter(f => f),
        saved: action.saved,
        share: action.share,
      };
    case UPDATE_ENTITIES:
      return {
        ...state,
        models: mergeEntityUpdates(state.models, action.entities),
      };
    case FETCHED_SECTOR:
      return {
        ...state,
        share: action.share,
        fetched: uniq([...state.fetched, action.sectorId]).filter(f => f),
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
        fetched: isGameView
          ? state.fetched
          : state.fetched.filter(id => includes(state.saved, id)),
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
    case UPDATE_ID_MAPPING: {
      const transformedSector = action.mapping[state.currentSector];
      return {
        ...state,
        currentSector: transformedSector || state.currentSector,
        currentEntity:
          action.mapping[state.currentEntity] || state.currentEntity,
        fetched: uniq([...state.fetched, transformedSector]).filter(f => f),
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
    case DELETE_ENTITIES: {
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
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}
