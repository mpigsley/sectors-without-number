import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  navigationSettingsSelector,
  isHelpOpenSelector,
} from 'store/selectors/base.selectors';
import { updateNavSettings, openHelp } from 'store/actions/navigation.actions';

import NavigationSidebar from './navigation-sidebar';

const mapStateToProps = createStructuredSelector({
  settings: navigationSettingsSelector,
  isHelpOpen: isHelpOpenSelector,
});

export default connect(mapStateToProps, { updateNavSettings, openHelp })(
  NavigationSidebar,
);
