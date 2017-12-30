import { LOCATION_CHANGE } from 'react-router-redux';
import { uniq } from 'lodash';

import {
  UPDATE_CONFIGURATION,
  ENTITY_HOLD,
  RELEASE_HOLD,
  ENTITY_HOVER_START,
  ENTITY_HOVER_END,
} from 'store/actions/sector.actions';
import { INITIALIZE } from 'store/actions/user.actions';
import { SAVE_SECTOR, UPDATE_ENTITIES } from 'store/actions/entity.actions';

import { generateSectorName } from 'utils/name-generator';
import { ROWS, COLUMNS } from 'constants/defaults';

const initialState = {
  renderSector: false,
  currentSector: null,
  currentEntityType: null,
  currentEntity: null,
  saved: [],
  holdKey: null,
  hoverKey: null,
  configuration: {
    sectorName: generateSectorName(),
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
        saved: uniq([...state.saved, state.currentSector]),
        holdKey: null,
        hoverKey: null,
      };
    case INITIALIZE:
      return {
        ...state,
        saved: action.saved,
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
    default:
      return state;
  }
}
