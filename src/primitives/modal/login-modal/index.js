import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';

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
    return (
      <Modal
        hideHeader
        isOpen={this.props.isOpen}
        onCancel={this.props.onComplete}
        title="Signup & Login"
        actionButtons={[
          <Button primary key="save" onClick={this.onConfirm}>
            {this.state.isLogin ? 'Log In' : 'Sign up'}
          </Button>,
        ]}
      >
        Login
      </Modal>
    );
  }
}
