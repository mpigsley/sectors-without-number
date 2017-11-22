import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw } from 'react-feather';
import { some, size, map } from 'lodash';

import SidebarNavigation from 'components/sidebar-navigation';
import SystemEditModal from 'components/system-edit-modal';

import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';
import ConfirmModal from 'primitives/modal/confirm-modal';

import { generateSectorName } from 'utils/name-generator';
import Entities from 'constants/entities';

import SectorBuilderInfo from './sector-builder-info';
import EntityList from './entity-list';

import './style.css';

export default class EntityInfo extends Component {
  static propTypes = {
    currentSector: PropTypes.string.isRequired,
    isCloudSave: PropTypes.bool.isRequired,
    entityChildren: PropTypes.shape().isRequired,
    entityType: PropTypes.string,
    entityId: PropTypes.string,
    entity: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    editSectorName: PropTypes.func.isRequired,
    deleteSector: PropTypes.func.isRequired,
    editSystem: PropTypes.func.isRequired,
    isSaved: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    entityType: undefined,
    entityId: undefined,
  };

  state = {
    name: this.props.entity.name,
    isConfirmDeleteOpen: false,
    isCreateEntityOpen: false,
    isEditOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entity.name !== this.props.entity.name) {
      this.setState({
        name: nextProps.entity.name,
      });
    }
  }

  onSaveEntity = () => {
    this.props.editSectorName(this.state.name);
    this.onCloseEdit();
  };

  onDeleteEntity = key => () => {
    this.onCancelDelete();
    this.props.deleteSector(key);
  };

  onCreateChildEntity = entity => {
    this.props.editSystem(entity);
    this.setState({ isCreateEntityOpen: false });
  };

  onEdit = () => this.setState({ isEditOpen: true });

  onCloseEdit = () => this.setState({ isEditOpen: false });

  onConfirmDelete = () => this.setState({ isConfirmDeleteOpen: true });

  onCancelDelete = () => this.setState({ isConfirmDeleteOpen: false });

  onEditText = extraState => e =>
    this.updateAttribute(e.target.dataset.key, e.target.value, extraState);

  onRandomizeName = namingFunc => () => this.setState({ name: namingFunc() });

  updateAttribute = (key, value, extraState = {}) =>
    this.setState({
      ...extraState,
      [key]: value,
    });

  renderEditModal() {
    return (
      <Modal
        isEditOpen={this.state.isEditOpen}
        onCancel={this.onCloseEdit}
        title="Edit Sector"
        actionButtons={[
          <Button primary key="save" onClick={this.onSaveEntity}>
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
          value={this.state.name}
          onChange={this.onEditText()}
          onIconClick={this.onRandomizeName(generateSectorName)}
        />
      </Modal>
    );
  }

  renderEmptyText() {
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
        onConfirm={this.onDeleteEntity(this.props.entityId)}
        onCancel={this.onCancelDelete}
      >
        Are you sure you want to delete this{' '}
        {Entities[this.props.entityType].name}?
      </ConfirmModal>
    );
  }

  render() {
    return (
      <SidebarNavigation
        name={this.props.entity.name}
        type={Entities.sector.key}
        onEdit={this.onEdit}
        onDelete={this.props.isSaved ? this.onConfirmDelete : undefined}
      >
        {this.renderEmptyText()}
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
        {this.renderEditModal()}
        {this.renderConfirmDeleteModal()}
        <SystemEditModal
          isOpen={this.state.isCreateEntityOpen}
          onClose={() => this.setState({ isCreateEntityOpen: false })}
          onSubmit={this.onCreateChildEntity}
        />
      </SidebarNavigation>
    );
  }
}
