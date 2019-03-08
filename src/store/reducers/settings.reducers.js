import { UPDATE_SETTINGS } from 'store/actions/settings.actions';

const initialState = {
  showEntityCount: true,
  showSystemName: false,
  showSystemNumber: true,
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
          ...state,
          [action.key]: action.value,
      }
    default:
      return state;
  }
}