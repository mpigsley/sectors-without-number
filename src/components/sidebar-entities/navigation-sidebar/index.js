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
  cancelNavigation,
  updateNavSettings,
  completeRoute,
  removeRoute,
  toggleVisibility,
  locateRoute,
} from 'store/actions/navigation.actions';

import NavigationSidebar from './navigation-sidebar';

const mapStateToProps = createStructuredSelector({
  settings: navigationSettingsSelector,
  isHelpOpen: isHelpOpenSelector,
  routes: getCurrentSectorNavigation,
});

const mapDispatchToProps = (dispatch, props) => ({
  resetNavSettings: () => dispatch(resetNavSettings()),
  cancelNavigation: () => dispatch(cancelNavigation()),
  updateNavSettings: (key, value) => dispatch(updateNavSettings(key, value)),
  completeRoute: () => dispatch(completeRoute(props.intl)),
  removeRoute: routeId => dispatch(removeRoute(routeId, props.intl)),
  toggleVisibility: routeId => dispatch(toggleVisibility(routeId, props.intl)),
  locateRoute: routeId => dispatch(locateRoute(routeId)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(NavigationSidebar),
);
