import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  navigationSettingsSelector,
  isHelpOpenSelector,
} from 'store/selectors/base.selectors';
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
});

export default connect(mapStateToProps, {
  resetNavSettings,
  updateNavSettings,
  openHelp,
  completeRoute,
})(NavigationSidebar);
