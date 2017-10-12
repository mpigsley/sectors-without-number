import { connect } from 'react-redux';

import {
  closeLoginModal,
  updateLoginForm,
  facebookLogin,
} from 'store/actions/user.actions';
import LoginModal from './login-modal';

const mapStateToProps = ({ user }) => ({
  ...user.form,
  isModalOpen: user.isModalOpen,
  isError: user.isError,
});

const mapDispatchToProps = dispatch => ({
  facebookLogin: () => {
    dispatch(facebookLogin());
  },
  closeLoginModal: () => {
    dispatch(closeLoginModal());
  },
  updateLoginForm: (key, value) => {
    dispatch(updateLoginForm(key, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
