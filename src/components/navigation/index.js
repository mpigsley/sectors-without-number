import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  openLoginModal,
  openEditModal,
  logout,
} from 'store/actions/user.actions';
import {
  isLoggedInSelector,
  currentSectorSelector,
  isSharedSectorSelector,
  lastOverviewEntitySelector,
} from 'store/selectors/base.selectors';

import Navigation from './navigation';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
  currentSector: currentSectorSelector,
  isSharedSector: isSharedSectorSelector,
  lastOverviewEntity: lastOverviewEntitySelector,
});

const mapDispatchTopProps = (dispatch, props) => ({
  openLoginModal: () => dispatch(openLoginModal()),
  openEditModal: () => dispatch(openEditModal()),
  logout: () => dispatch(logout(props.intl)),
});

export default injectIntl(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchTopProps,
    )(Navigation),
  ),
);
