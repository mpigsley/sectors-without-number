import { connect } from 'react-redux';

import {
  closeLoginModal,
  updateLoginForm,
  facebookLogin,
  googleLogin,
  signup,
  login,
  passwordReset,
} from 'store/actions/user.actions';
import LoginModal from './login-modal';

const mapStateToProps = ({ user }) => ({
  ...user.form,
  isModalOpen: user.isModalOpen,
  error: user.error,
});

const mapDispatchToProps = dispatch => ({
  facebookLogin: () => dispatch(facebookLogin()),
  googleLogin: () => dispatch(googleLogin()),
  signup: () => dispatch(signup()),
  login: () => dispatch(login()),
  closeLoginModal: () => dispatch(closeLoginModal()),
  updateLoginForm: (key, value) => dispatch(updateLoginForm(key, value)),
  passwordReset: () => dispatch(passwordReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
