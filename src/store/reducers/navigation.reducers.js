import {
  RESET_NAV_SETTINGS,
  UPDATED_NAV_SETTINGS,
} from 'store/actions/navigation.actions';

const initialSettings = () => ({
  color: '#dbdbdb',
  width: 'normal',
  type: 'solid',
});

export const initialState = {
  settings: initialSettings(),
  isHelpOpen: false,
};

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case RESET_NAV_SETTINGS:
      return {
        ...state,
        settings: initialSettings(),
      };
    case UPDATED_NAV_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.key]: action.value,
        },
      };
    default:
      return state;
  }
}
