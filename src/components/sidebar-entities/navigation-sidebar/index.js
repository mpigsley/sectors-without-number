import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  navigationSettingsSelector,
  isHelpOpenSelector,
} from 'store/selectors/base.selectors';
import { getCurrentSectorNavigation } from 'store/selectors/navigation.selectors';
import {
  resetNavSettings,
  updateNavSettings,
  openHelp,
  completeRoute,
} from 'store/actions/navigation.actions';

import NavigationSidebar from './navigation-sidebar';

const mapStateToProps = createStructuredSelector({
  settings: navigationSettingsSelector,
  isHelpOpen: isHelpOpenSelector,
  navigation: getCurrentSectorNavigation,
});

export default injectIntl(
  connect(mapStateToProps, {
    resetNavSettings,
    updateNavSettings,
    openHelp,
    completeRoute,
  })(NavigationSidebar),
);
