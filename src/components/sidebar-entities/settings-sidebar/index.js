import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { updateSettings } from 'store/actions/settings.actions';

import SettingsSidebar from './settings-sidebar';

const mapStateToProps = state => ({ 
  settings: state.settings,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateSettings: (key, value) => dispatch(updateSettings(key, value)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SettingsSidebar),
);
