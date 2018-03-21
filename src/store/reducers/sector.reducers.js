import { LOCATION_CHANGE } from 'react-router-redux';

import {
  UPDATE_CONFIGURATION,
  ENTITY_HOLD,
  RELEASE_HOLD,
  ENTITY_HOVER_START,
  ENTITY_HOVER_END,
  RELEASE_SYNC_LOCK,
  TOP_LEVEL_ENTITY_CREATE,
  CANCEL_TOP_LEVEL_ENTITY_CREATE,
  SET_EXPORT_TYPE,
} from 'store/actions/sector.actions';
import {
  SAVE_SECTOR,
  UPDATE_ENTITIES,
  DELETE_ENTITIES,
} from 'store/actions/entity.actions';

import { ROWS, COLUMNS } from 'constants/defaults';
import Entities from 'constants/entities';
import ExportTypes from 'constants/export-types';

const initialState = {
  renderSector: false,
  holdKey: null,
  hoverKey: null,
  topLevelKey: null,
  syncLock: false,
  exportType: ExportTypes.condensed.key,
  configuration: {
    name: Entities.sector.nameGenerator(),
    isBuilder: false,
    additionalPointsOfInterest: true,
    columns: COLUMNS,
    rows: ROWS,
  },
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const { pathname } = action.payload;
      if (['/', '/configure', '/changelog'].indexOf(pathname) >= 0) {
        return {
          ...initialState,
          renderSector: false,
          configuration: {
            ...initialState.configuration,
            name: Entities.sector.nameGenerator(),
          },
        };
      } else if (pathname.startsWith('/sector/')) {
        return { ...state, renderSector: true };
      }
      return { ...state, renderSector: false };
    }
    case SAVE_SECTOR:
    case UPDATE_ENTITIES:
    case DELETE_ENTITIES:
      return {
        ...state,
        holdKey: null,
        hoverKey: null,
        topLevelKey: null,
        syncLock: true,
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
    case TOP_LEVEL_ENTITY_CREATE:
      return { ...state, topLevelKey: action.key };
    case CANCEL_TOP_LEVEL_ENTITY_CREATE:
      return { ...state, topLevelKey: null };
    case SET_EXPORT_TYPE:
      return { ...state, exportType: action.exportType };
    default:
      return state;
  }
}
