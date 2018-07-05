import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import ActionLayout from 'components/sidebar-actions/action-layout';
import ConfirmModal from 'primitives/modal/confirm-modal';
import Header, { HeaderType } from 'primitives/text/header';

import Entities from 'constants/entities';

import './style.css';

export default class EntityActions extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    removeLayer: PropTypes.func.isRequired,
    initializeLayerEdit: PropTypes.func.isRequired,
    layer: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    isSaved: PropTypes.bool.isRequired,
    isShared: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    layer: null,
  };

  state = {
    isConfirmDeleteOpen: false,
  };

  onConfirmDelete = () => this.setState({ isConfirmDeleteOpen: true });
  onCancelDelete = () => this.setState({ isConfirmDeleteOpen: false });
  onDeleteEntity = () => {
    this.onCancelDelete();
    this.props.removeLayer();
  };

  buildActions = () => {
    const actions = [];
    if (this.props.isSaved && !this.props.isShared) {
      if (this.props.layer) {
        actions.push({
          key: 'edit',
          children: this.props.intl.formatMessage({ id: 'misc.edit' }),
          onClick: this.props.initializeLayerEdit,
        });
      }
      actions.push({
        key: 'delete',
        children: this.props.intl.formatMessage({ id: 'misc.delete' }),
        onClick: this.onConfirmDelete,
      });
    }
    return actions;
  };

  renderName() {
    if (!this.props.layer) {
      return this.props.intl.formatMessage({ id: Entities.layer.name });
    }
    return [
      <Header key="header" type={HeaderType.header2}>
        {this.props.layer.name}
      </Header>,
      <Header
        key="sub-header"
        type={HeaderType.header3}
        className="EntityActions-TypeHeader"
      >
        (<FormattedMessage id={Entities.layer.name} />)
      </Header>,
    ];
  }

  render() {
    return (
      <ActionLayout
        backUrl={this.backUrl}
        actions={this.buildActions()}
        name={this.renderName()}
      >
        {this.props.children}
        <ConfirmModal
          isOpen={this.state.isConfirmDeleteOpen}
          onConfirm={this.onDeleteEntity}
          onCancel={this.onCancelDelete}
        >
          <FormattedMessage
            id="misc.toDeleteEntity"
            values={{
              entity: this.props.intl.formatMessage({
                id: Entities.layer.name,
              }),
            }}
          />
        </ConfirmModal>
      </ActionLayout>
    );
  }
}
