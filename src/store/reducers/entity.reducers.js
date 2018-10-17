import { LOCATION_CHANGE } from 'connected-react-router';

import {
  includes,
  uniq,
  mapValues,
  mapKeys,
  omit,
  keys,
  without,
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
  DELETED_LAYER,
  EXPAND_SECTOR,
} from 'store/actions/combined.actions';
import { LOGGED_IN, LOGGED_OUT } from 'store/actions/user.actions';
import { mergeEntityUpdates } from 'utils/entity';

const initialState = {
  models: mapValues(Entities, () => ({})),
  saved: [],
  generated: [],
  share: null,
  currentSector: null,
  currentEntityType: null,
  currentEntity: null,
  lastOverviewEntity: null,
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
    case EXPAND_SECTOR:
      return {
        ...state,
        models: mergeEntityUpdates(state.models, action.entities),
        generated: uniq([
          ...state.generated,
          ...keys(action.entities[Entities.sector.key]),
        ]),
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
      const { pathname } = action.payload.location;
      const isOverview = pathname.startsWith('/overview/');
      const isGameView =
        pathname.startsWith('/sector/') ||
        pathname.startsWith('/elements/') ||
        isOverview;
      const currentSector = isGameView ? pathname.split('/')[2] : null;
      const uniqSectors = uniq([...state.saved, currentSector]).filter(s => s);
      const currentEntityType = isGameView ? pathname.split('/')[3] : null;
      let share =
        isGameView && includes(uniqSectors, state.share) ? state.share : null;
      if (!state.share) {
        share = includes([...state.saved, ...state.generated], currentSector)
          ? null
          : currentSector;
      }
      return {
        ...state,
        currentSector,
        currentEntityType,
        lastOverviewEntity:
          isOverview && currentEntityType
            ? currentEntityType
            : state.lastOverviewEntity,
        share,
        currentEntity: isGameView ? pathname.split('/')[4] : null,
      };
    }
    case UPDATED_ID_MAPPING: {
      const transformedSector = action.mapping[state.currentSector];
      return {
        ...state,
        generated: without(state.generated, ...keys(action.mapping)),
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
    case DELETED_LAYER:
    case CREATED_LAYER:
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
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}
