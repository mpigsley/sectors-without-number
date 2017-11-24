import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw } from 'react-feather';
import { some, size, map } from 'lodash';

import SystemEditModal from 'components/system-edit-modal';
import PlanetEditModal from 'components/planet-edit-modal';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import ConfirmModal from 'primitives/modal/confirm-modal';

import { generateSectorName } from 'utils/name-generator';
import Entities from 'constants/entities';

import SectorBuilderInfo from './sector-builder-info';
import EntityAttributes from './entity-attributes';
import EntityList from './entity-list';
import Navigation from './navigation';

import './style.css';

export default class EntityInfo extends Component {
  static propTypes = {
    currentSector: PropTypes.string.isRequired,
    isCloudSave: PropTypes.bool.isRequired,
    entityChildren: PropTypes.shape().isRequired,
    entityType: PropTypes.string,
    entity: PropTypes.shape({
      name: PropTypes.string.isRequired,
      parent: PropTypes.string,
      parentEntity: PropTypes.string,
      attributes: PropTypes.shape(),
    }).isRequired,
    updateEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    isSaved: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    entityType: undefined,
  };

  state = {
    entity: { ...this.props.entity },
    isConfirmDeleteOpen: false,
    isCreateEntityOpen: false,
    isEditOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entity.name !== this.props.entity.name) {
      this.setState({ entity: nextProps.entity });
    }
  }

  onUpdateEntity = () => {
    this.onCloseEdit();
    this.props.updateEntity(this.state.entity);
  };

  onDeleteEntity = () => {
    this.onCancelDelete();
    this.props.deleteEntity();
  };

  onCreateChildEntity = () => this.setState({ isCreateEntityOpen: false });

  onEdit = () => this.setState({ isEditOpen: true });

  onCloseEdit = () => this.setState({ isEditOpen: false });

  onConfirmDelete = () => this.setState({ isConfirmDeleteOpen: true });

  onCancelDelete = () => this.setState({ isConfirmDeleteOpen: false });

  onEditText = extraState => e =>
    this.updateAttribute(e.target.dataset.key, e.target.value, extraState);

  onRandomizeName = namingFunc => () =>
    this.setState({ entity: { ...this.state.entity, name: namingFunc() } });

  updateAttribute = (key, value, extraState = {}) =>
    this.setState({
      ...extraState,
      [key]: value,
    });

  // TODO: Refactor into sidebar edit mode instead of specific modals
  renderEditModal() {
    if (this.props.entityType === Entities.sector.key) {
      return (
        <Modal
          isOpen={this.state.isEditOpen}
          onCancel={this.onCloseEdit}
          title="Edit Sector"
          actionButtons={[
            <Button primary key="save" onClick={this.onUpdateEntity}>
              Save {Entities[this.props.entityType].name}
            </Button>,
          ]}
        >
          <Label noPadding htmlFor="name">
            Sector Name
          </Label>
          <IconInput
            id="name"
            name="name"
            data-key="name"
            icon={RefreshCw}
            value={this.state.entity.name}
            onChange={this.onEditText()}
            onIconClick={this.onRandomizeName(generateSectorName)}
          />
        </Modal>
      );
    } else if (this.props.entityType === Entities.system.key) {
      return (
        <SystemEditModal
          isOpen={this.state.isEditOpen}
          onClose={this.onCloseEdit}
          onSubmit={this.onUpdateEntity}
          system={this.state.entity}
        />
      );
    }
    return (
      <PlanetEditModal
        isOpen={this.state.isEditOpen}
        onClose={this.onCloseEdit}
        onSubmit={this.onUpdateEntity}
        planet={this.props.entity}
      />
    );
  }

  renderSectorBuilderText() {
    if (
      some(this.props.entityChildren, size) ||
      this.props.entityType !== Entities.sector.key
    ) {
      return null;
    }
    return <SectorBuilderInfo />;
  }

  renderConfirmDeleteModal() {
    return (
      <ConfirmModal
        isOpen={this.state.isConfirmDeleteOpen}
        onConfirm={this.onDeleteEntity}
        onCancel={this.onCancelDelete}
      >
        Are you sure you want to delete this{' '}
        {Entities[this.props.entityType].name}?
      </ConfirmModal>
    );
  }

  render() {
    return (
      <Navigation
        name={this.props.entity.name}
        onEdit={this.onEdit}
        onDelete={this.props.isSaved ? this.onConfirmDelete : undefined}
      >
        <EntityAttributes
          attributes={this.props.entity.attributes}
          entityType={this.props.entityType}
        />
        {map(this.props.entityChildren, (entities, entityType) => (
          <EntityList
            key={entityType}
            entities={entities}
            entityType={entityType}
            currentSector={this.props.currentSector}
            isCloudSave={this.props.isCloudSave}
            onClickAdd={() => this.setState({ isCreateEntityOpen: true })}
          />
        ))}
        {this.renderSectorBuilderText()}
        {this.renderEditModal()}
        {this.renderConfirmDeleteModal()}
        <SystemEditModal
          isOpen={this.state.isCreateEntityOpen}
          onClose={() => this.setState({ isCreateEntityOpen: false })}
          onSubmit={this.onCreateChildEntity}
        />
      </Navigation>
    );
  }
}
