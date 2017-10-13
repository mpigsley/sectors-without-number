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

export default class ConfirmModal extends Component {
  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeLoginModal: PropTypes.func.isRequired,
    updateLoginForm: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: null,
  };

  state = {
    isLogin: true,
  };

  onConfirm = () => {
    if (this.state.isLogin) {
      this.props.login();
    } else {
      this.props.signup();
    }
  };

  onEditText = ({ target }) => {
    this.props.updateLoginForm(target.dataset.key, target.value);
  };

  renderPasswordConfirm() {
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
    const actionText = this.state.isLogin ? 'Log in' : 'Sign up';
    return (
      <ReactModal
        contentLabel="Signup & Login"
        isOpen={this.props.isModalOpen}
        onCancel={this.props.closeLoginModal}
        className="LoginModal"
        overlayClassName={{
          base: 'LoginModal-Overlay',
        }}
      >
        <X
          className="LoginModal-Close"
          onClick={this.props.closeLoginModal}
          size={30}
        />
        <FlexContainer justify="center" wrap>
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
        <div className="LoginModal-LineContainer">
          <hr className="LoginModal-Line" />
          <span className="LoginModal-Or">or </span>
        </div>
        <FlexContainer className="LoginModal-Switcher" justify="center">
          <button
            onClick={() => this.setState({ isLogin: true })}
            className={classNames('LoginModal-SwitchButton', {
              'LoginModal-SwitchButton--active': this.state.isLogin,
            })}
          >
            Log In
          </button>
          <button
            onClick={() => this.setState({ isLogin: false })}
            className={classNames('LoginModal-SwitchButton', {
              'LoginModal-SwitchButton--active': !this.state.isLogin,
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
          {this.state.isLogin ? undefined : this.renderPasswordConfirm()}
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
