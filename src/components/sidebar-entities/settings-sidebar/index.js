import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { updateSettings } from 'store/actions/settings.actions';
import { settingsSelector } from 'store/selectors/base.selectors';

import SettingsSidebar from './settings-sidebar';

const mapStateToProps = (state) => ({
  settings: settingsSelector(state),
});

const mapDispatchToProps = { updateSettings };

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(SettingsSidebar),
);
