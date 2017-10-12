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
    isOpen: PropTypes.bool.isRequired,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
  };

  state = {
    isLogin: true,
    email: '',
    password: '',
    confirm: '',
  };

  onConfirm = () => {
    this.props.onComplete();
  };

  onEditText = ({ target }) => {
    this.setState({ [target.dataset.key]: target.value });
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
          value={this.state.confirm}
          onChange={this.onEditText}
        />
      </div>
    );
  }

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
        <X
          className="LoginModal-Close"
          onClick={this.props.onComplete}
          size={30}
        />
        <FlexContainer justify="center">
          <Button
            className="LoginModal-Facebook"
            onClick={this.props.onComplete}
          >
            Log In with Facebook
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
            value={this.state.email}
            onChange={this.onEditText}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            data-key="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onEditText}
          />
          {this.state.isLogin ? undefined : this.renderPasswordConfirm()}
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
