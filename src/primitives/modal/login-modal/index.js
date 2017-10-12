import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import Button from 'primitives/other/button';
import FlexContainer from 'primitives/container/flex-container';

import './style.css';

export default class ConfirmModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
  };

  state = {
    isLogin: true,
  };

  onConfirm = () => {};

  render() {
    const actionText = this.state.isLogin ? 'Log in' : 'Sign up';
    return (
      <ReactModal
        contentLabel="Signup & Login"
        isOpen={this.props.isOpen}
        onCancel={this.props.onComplete}
        className="LoginModal"
        overlayClassName={{
          base: 'LoginModal-Overlay',
        }}
      >
        <FlexContainer justify="center">
          <Button className="LoginModal-Facebook">Log In with Facebook</Button>
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
        <FlexContainer className="LoginModal-FormContainer" justify="center">
          <Button primary key="save" onClick={this.onConfirm}>
            {actionText}
          </Button>
        </FlexContainer>
      </ReactModal>
    );
  }
}
