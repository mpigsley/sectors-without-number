import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import {
  openLoginModal,
  openEditModal,
  logout,
} from 'store/actions/user.actions';
import {
  userUidSelector,
  currentSectorSelector,
  isSharedSectorSelector,
  lastOverviewEntitySelector,
} from 'store/selectors/base.selectors';

import Navigation from './navigation';

const mapStateToProps = state => ({
  isLoggedIn: !!userUidSelector(state),
  currentSector: currentSectorSelector(state),
  isSharedSector: isSharedSectorSelector(state),
  lastOverviewEntity: lastOverviewEntitySelector(state),
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
