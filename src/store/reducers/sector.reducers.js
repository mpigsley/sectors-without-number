import { LOCATION_CHANGE } from 'react-router-redux';
import { uniq } from 'lodash';

import {
  UPDATE_CONFIGURATION,
  ENTITY_HOLD,
  RELEASE_HOLD,
  ENTITY_HOVER_START,
  ENTITY_HOVER_END,
  RELEASE_SYNC_LOCK,
  TOP_LEVEL_ENTITY_CREATE,
} from 'store/actions/sector.actions';
import {
  SAVE_SECTOR,
  UPDATE_ENTITIES,
  DELETE_ENTITIES,
  UPDATE_ID_MAPPING,
} from 'store/actions/entity.actions';
import { INITIALIZE } from 'store/actions/user.actions';

import { generateSectorName } from 'utils/name-generator';
import { ROWS, COLUMNS } from 'constants/defaults';
import Entities from 'constants/entities';
import { CANCEL_TOP_LEVEL_ENTITY_CREATE } from '../actions/sector.actions';

const initialState = {
  renderSector: false,
  currentSector: null,
  currentEntityType: null,
  currentEntity: null,
  saved: [],
  holdKey: null,
  hoverKey: null,
  topLevelKey: null,
  syncLock: false,
  configuration: {
    name: generateSectorName(),
    isBuilder: false,
    columns: COLUMNS,
    rows: ROWS,
  },
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const { pathname } = action.payload;
      if (['/', '/configure'].indexOf(pathname) >= 0) {
        return {
          ...initialState,
          renderSector: false,
          saved: state.saved,
          configuration: {
            ...initialState.configuration,
            name: generateSectorName(),
          },
        };
      }
      if (pathname.startsWith('/sector/')) {
        return {
          ...state,
          renderSector: true,
          currentSector: pathname.split('/')[2],
          currentEntityType: pathname.split('/')[3],
          currentEntity: pathname.split('/')[4],
        };
      }
      return {
        ...state,
        renderSector: false,
      };
    }
    case SAVE_SECTOR:
    case UPDATE_ENTITIES:
      return {
        ...state,
        saved: uniq([...state.saved, state.currentSector]).filter(s => s),
        holdKey: null,
        hoverKey: null,
        topLevelKey: null,
        syncLock: true,
      };
    case DELETE_ENTITIES: {
      const deletedSectorIds = action.entities[Entities.sector.key] || [];
      return {
        ...state,
        saved: state.saved.filter(
          saveId => deletedSectorIds.indexOf(saveId) < 0,
        ),
        holdKey: null,
        hoverKey: null,
        topLevelKey: null,
        syncLock: true,
      };
    }
    case UPDATE_ID_MAPPING:
      return {
        ...state,
        saved: state.saved.map(saveId => action.mapping[saveId] || saveId),
      };
    case UPDATE_CONFIGURATION:
      return {
        ...state,
        configuration: {
          ...state.configuration,
          [action.key]: action.value,
        },
      };
    case ENTITY_HOLD:
      return { ...state, holdKey: action.key };
    case RELEASE_HOLD:
      return { ...state, holdKey: null };
    case ENTITY_HOVER_START:
      return { ...state, hoverKey: action.key };
    case ENTITY_HOVER_END:
      return { ...state, hoverKey: null };
    case RELEASE_SYNC_LOCK:
      return { ...state, syncLock: false };
    case INITIALIZE:
      return { ...state, saved: action.saved };
    case TOP_LEVEL_ENTITY_CREATE:
      return { ...state, topLevelKey: action.key };
    case CANCEL_TOP_LEVEL_ENTITY_CREATE:
      return { ...state, topLevelKey: null };
    default:
      return state;
  }
}
