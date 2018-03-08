import { connect } from 'react-redux';

import {
  openLoginModal,
  openEditModal,
  logout,
} from 'store/actions/user.actions';
import {
  userUidSelector,
  currentSectorSelector,
} from 'store/selectors/base.selectors';

import Navigation from './navigation';

const mapStateToProps = state => ({
  isLoggedIn: !!userUidSelector(state),
  currentSector: currentSectorSelector(state),
});

export default connect(mapStateToProps, {
  openLoginModal,
  openEditModal,
  logout,
})(Navigation);
