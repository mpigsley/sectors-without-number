import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import ActionLayout from 'components/sidebar-actions/action-layout';
import ConfirmModal from 'primitives/modal/confirm-modal';
import Header, { HeaderType } from 'primitives/text/header';
import SaveFooter from 'primitives/other/save-footer';

import Entities from 'constants/entities';

import './style.scss';

export default class LayerActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConfirmDeleteOpen: false,
    };
  }

  onConfirmDelete = () => this.setState({ isConfirmDeleteOpen: true });

  onCancelDelete = () => this.setState({ isConfirmDeleteOpen: false });

  onDeleteEntity = () => {
    const { removeLayer } = this.props;
    this.onCancelDelete();
    removeLayer();
  };

  buildActions = () => {
    const { isSaved, isShared, layer, intl, initializeLayerEdit } = this.props;
    const actions = [];
    if (isSaved && !isShared) {
      if (layer) {
        actions.push({
          key: 'edit',
          children: intl.formatMessage({ id: 'misc.edit' }),
          onClick: initializeLayerEdit,
        });
      }
      actions.push({
        key: 'delete',
        children: intl.formatMessage({ id: 'misc.delete' }),
        onClick: this.onConfirmDelete,
      });
    }
    return actions;
  };

  renderName() {
    const { layer, intl } = this.props;
    if (!layer) {
      return intl.formatMessage({ id: Entities.layer.name });
    }
    return [
      <Header key="header" type={HeaderType.header2}>
        {layer.name}
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

  renderFooter() {
    const {
      layerId,
      isEditing,
      isValid,
      cancelForm,
      submitForm,
      route,
      sector,
    } = this.props;
    if (layerId && !isEditing) {
      return null;
    }
    return (
      <SaveFooter
        onCancel={() => (isEditing ? cancelForm() : route(`/sector/${sector}`))}
        onSave={() => submitForm()}
        saveText={isEditing ? 'misc.editLayer' : 'misc.createLayer'}
        disabled={!isValid}
      />
    );
  }

  render() {
    const { children, intl } = this.props;
    const { isConfirmDeleteOpen } = this.state;
    return (
      <ActionLayout
        backUrl={this.backUrl}
        actions={this.buildActions()}
        name={this.renderName()}
        footer={this.renderFooter()}
      >
        {children}
        <ConfirmModal
          isOpen={isConfirmDeleteOpen}
          onConfirm={this.onDeleteEntity}
          onCancel={this.onCancelDelete}
        >
          <FormattedMessage
            id="misc.toDeleteEntity"
            values={{
              entity: intl.formatMessage({
                id: Entities.layer.name,
              }),
            }}
          />
        </ConfirmModal>
      </ActionLayout>
    );
  }
}

LayerActions.propTypes = {
  children: PropTypes.node.isRequired,
  removeLayer: PropTypes.func.isRequired,
  initializeLayerEdit: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
  route: PropTypes.func.isRequired,
  layer: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  layerId: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isShared: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  sector: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

LayerActions.defaultProps = {
  layer: null,
  layerId: null,
};
