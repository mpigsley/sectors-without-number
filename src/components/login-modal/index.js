import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  closeLoginModal,
  updateUserForm,
  googleLogin,
  signup,
  login,
  passwordReset,
} from 'store/actions/user.actions';
import LoginModal from './login-modal';

const mapStateToProps = ({ user }) => ({
  ...user.form,
  isLoginModalOpen: user.isLoginModalOpen,
  error: user.error,
});

const mapDispatchToProps = (dispatch, props) => ({
  googleLogin: () => dispatch(googleLogin()),
  signup: () => dispatch(signup(props.intl)),
  login: () => dispatch(login(props.intl)),
  closeLoginModal: () => dispatch(closeLoginModal()),
  updateUserForm: (key, value) => dispatch(updateUserForm(key, value)),
  passwordReset: () => dispatch(passwordReset(props.intl)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginModal),
);
