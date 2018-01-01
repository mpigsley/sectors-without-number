import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { X } from 'react-feather';

import Button from 'primitives/other/button';
import FlexContainer from 'primitives/container/flex-container';
import Label from 'primitives/form/label';
import Input from 'primitives/form/input';

import './style.css';

const LOGIN_PAGE_TYPES = {
  login: 'login',
  signup: 'signup',
  forget: 'forget',
};

export default class ConfirmModal extends Component {
  static propTypes = {
    isLoginModalOpen: PropTypes.bool.isRequired,
    closeLoginModal: PropTypes.func.isRequired,
    updateUserForm: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    passwordReset: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: null,
  };

  state = {
    page: LOGIN_PAGE_TYPES.login,
  };

  onConfirm = () => {
    if (this.state.page === LOGIN_PAGE_TYPES.login) {
      this.props.login();
    } else if (this.state.page === LOGIN_PAGE_TYPES.signup) {
      this.props.signup();
    } else {
      this.props.passwordReset();
    }
  };

  onEditText = ({ target }) => {
    this.props.updateUserForm(target.dataset.key, target.value);
  };

  renderPassword() {
    if (this.state.page === LOGIN_PAGE_TYPES.forget) {
      return null;
    }
    return (
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          data-key="password"
          type="password"
          placeholder="Password"
          value={this.props.password}
          onChange={this.onEditText}
        />
      </div>
    );
  }

  renderForgotPassword() {
    if (this.state.page !== LOGIN_PAGE_TYPES.login) {
      return null;
    }
    return (
      <div className="LoginModal-Forgot">
        <Button
          minimal
          onClick={() => this.setState({ page: LOGIN_PAGE_TYPES.forget })}
        >
          Forgot Password?
        </Button>
      </div>
    );
  }

  renderPasswordConfirm() {
    if (this.state.page !== LOGIN_PAGE_TYPES.signup) {
      return null;
    }
    return (
      <div>
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input
          id="confirm"
          name="confirm"
          data-key="confirm"
          type="password"
          placeholder="Confirm"
          value={this.props.confirm}
          onChange={this.onEditText}
        />
      </div>
    );
  }

  renderError() {
    if (!this.props.error) {
      return null;
    }
    return (
      <FlexContainer className="LoginModal-Error" justify="center">
        {this.props.error}
      </FlexContainer>
    );
  }

  render() {
    let actionText = 'Send Password Reset';
    if (this.state.page === LOGIN_PAGE_TYPES.login) {
      actionText = 'Log in';
    } else if (this.state.page === LOGIN_PAGE_TYPES.signup) {
      actionText = 'Sign up';
    }

    return (
      <ReactModal
        contentLabel="Signup & Login"
        isOpen={this.props.isLoginModalOpen}
        onCancel={this.props.closeLoginModal}
        className="LoginModal"
        overlayClassName="LoginModal-Overlay"
        ariaHideApp={false}
      >
        <X
          className="LoginModal-Close"
          onClick={this.props.closeLoginModal}
          size={30}
        />
        <FlexContainer justify="center" align="center" direction="column">
          <Button
            className="LoginModal-Facebook"
            onClick={this.props.facebookLogin}
          >
            Log In with Facebook
          </Button>
          <Button
            className="LoginModal-Google"
            onClick={this.props.googleLogin}
          >
            Log In with Google
          </Button>
        </FlexContainer>
        <FlexContainer
          className="LoginModal-LineContainer"
          align="center"
          justify="center"
        >
          <span className="LoginModal-Line" />
          <span className="LoginModal-Or">or</span>
          <span className="LoginModal-Line" />
        </FlexContainer>
        <FlexContainer className="LoginModal-Switcher" justify="center">
          <button
            onClick={() => this.setState({ page: LOGIN_PAGE_TYPES.login })}
            className={classNames('LoginModal-SwitchButton', {
              'LoginModal-SwitchButton--active':
                this.state.page === LOGIN_PAGE_TYPES.login,
            })}
          >
            Log In
          </button>
          <button
            onClick={() => this.setState({ page: LOGIN_PAGE_TYPES.signup })}
            className={classNames('LoginModal-SwitchButton', {
              'LoginModal-SwitchButton--active':
                this.state.page === LOGIN_PAGE_TYPES.signup,
            })}
          >
            Sign Up
          </button>
        </FlexContainer>
        <FlexContainer
          className="LoginModal-FormContainer"
          justify="center"
          direction="column"
        >
          <Label noPadding htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            data-key="email"
            placeholder="Email"
            value={this.props.email}
            onChange={this.onEditText}
          />
          {this.renderPassword()}
          {this.renderForgotPassword()}
          {this.renderPasswordConfirm()}
          {this.renderError()}
          <FlexContainer className="LoginModal-Submit" justify="center">
            <Button primary key="submit" onClick={this.onConfirm}>
              {actionText}
            </Button>
          </FlexContainer>
        </FlexContainer>
      </ReactModal>
    );
  }
}
