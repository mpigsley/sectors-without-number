import { LOCATION_CHANGE } from 'react-router-redux';

import {
  UPDATE_CONFIGURATION,
  ENTITY_HOLD,
  RELEASE_HOLD,
  ENTITY_HOVER,
  RELEASE_SYNC_LOCK,
  TOP_LEVEL_ENTITY_CREATE,
  CANCEL_TOP_LEVEL_ENTITY_CREATE,
  SET_EXPORT_TYPE,
  OPENED_EXPORT,
  CLOSED_EXPORT,
  PRINTING_STARTED,
  PRINTING_COMPLETE,
  CLEARED_MAP_KEYS,
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
  isExportOpen: false,
  isPrinting: false,
  configuration: {
    name: Entities.sector.nameGenerator(),
    isBuilder: false,
    additionalPointsOfInterest: true,
    hideOccAndSit: true,
    hideTags: true,
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
    case ENTITY_HOVER:
      return { ...state, hoverKey: action.key };
    case RELEASE_SYNC_LOCK:
      return { ...state, syncLock: false };
    case TOP_LEVEL_ENTITY_CREATE:
      return { ...state, topLevelKey: action.key };
    case CANCEL_TOP_LEVEL_ENTITY_CREATE:
      return { ...state, topLevelKey: null };
    case SET_EXPORT_TYPE:
      return { ...state, exportType: action.exportType };
    case OPENED_EXPORT:
      return { ...state, isExportOpen: true };
    case CLOSED_EXPORT:
      return {
        ...state,
        isExportOpen: false,
        exportType: ExportTypes.condensed.key,
      };
    case PRINTING_STARTED:
      return { ...state, isExportOpen: false, isPrinting: true };
    case PRINTING_COMPLETE:
      return { ...state, isPrinting: false };
    case CLEARED_MAP_KEYS:
      return { ...state, holdKey: null, hoverKey: null };
    default:
      return state;
  }
}
