import { LOCATION_CHANGE } from 'react-router-redux';

import { generateSectorName } from 'utils/name-generator';
import { ROWS, COLUMNS } from 'constants/defaults';
import { UPDATE_CONFIGURATION } from 'store/actions/sector.actions';
import { INITIALIZE } from 'store/actions/user.actions';

const initialState = {
  renderSector: false,
  currentSector: null,
  currentEntityType: null,
  currentEntity: null,
  saved: [],
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
    default:
      return state;
  }
}
