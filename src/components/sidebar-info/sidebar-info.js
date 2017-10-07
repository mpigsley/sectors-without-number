import React, { Component } from 'react';
import Chance from 'chance';

import ConfirmModal from 'primitives/other/confirm-modal';

import './style.css';

export default class SidebarInfo extends Component {
  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onEditText = this.onEditText.bind(this);
    this.onEditDropdown = this.onEditDropdown.bind(this);
    this.updateAttribute = this.updateAttribute.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
    this.onCancelDelete = this.onCancelDelete.bind(this);
  }

  onEdit() {
    this.setState({ isOpen: true });
  }

  onClose() {
    this.setState({ isOpen: false });
  }

  onConfirmDelete() {
    this.setState({ isConfirmDeleteOpen: true });
  }

  onCancelDelete() {
    this.setState({ isConfirmDeleteOpen: false });
  }

  onEditDropdown(key, extraState) {
    return changed => {
      this.updateAttribute(key, changed, extraState);
    };
  }

  onEditText(extraState) {
    return e => {
      this.updateAttribute(e.target.dataset.key, e.target.value, extraState);
    };
  }

  onRandomizeName(namingFunc) {
    return () => {
      const chance = new Chance();
      this.setState({ name: namingFunc(chance) });
    };
  }

  updateAttribute(key, value, extraState = {}) {
    this.setState({
      ...extraState,
      [key]: value,
    });
  }

  renderConfirmModal(onDelete, itemName) {
    return (
      <ConfirmModal
        isOpen={this.state.isConfirmDeleteOpen}
        onConfirm={onDelete}
        onCancel={this.onCancelDelete}
      >
        Are you sure you want to delete this {itemName}?
      </ConfirmModal>
    );
  }

  render() {
    return null;
  }
}
