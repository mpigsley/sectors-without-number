import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { navigationSettingsSelector } from 'store/selectors/base.selectors';
import { updateNavSettings } from 'store/actions/navigation.actions';

import NavigationSidebar from './navigation-sidebar';

const mapStateToProps = createStructuredSelector({
  settings: navigationSettingsSelector,
});

export default connect(mapStateToProps, { updateNavSettings })(
  NavigationSidebar,
);
