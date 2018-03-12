import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some, size } from 'lodash';

import SectorMap from 'components/sector-map';
import ConfirmModal from 'primitives/modal/confirm-modal';
import Entities from 'constants/entities';

import SectorBuilderInfo from './sector-builder-info';
import EntityNavigation from './entity-navigation';
import ExportModal from './export-modal';

export default class Sidebar extends Component {
  static propTypes = {
    entityChildren: PropTypes.shape().isRequired,
    entityType: PropTypes.string,
    entity: PropTypes.shape({
      name: PropTypes.string.isRequired,
      parent: PropTypes.string,
      parentEntity: PropTypes.string,
      attributes: PropTypes.shape(),
    }).isRequired,
    deleteEntity: PropTypes.func.isRequired,
    isSidebarEditActive: PropTypes.bool.isRequired,
    match: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    entityType: undefined,
  };

  state = {
    entity: { ...this.props.entity },
    isConfirmDeleteOpen: false,
    isExportOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.entity.name !== this.props.entity.name) {
      this.setState({ entity: nextProps.entity });
    }
  }

  onDeleteEntity = () => {
    this.onCancelDelete();
    this.props.deleteEntity();
  };

  onConfirmDelete = () => this.setState({ isConfirmDeleteOpen: true });

  onCancelDelete = () => this.setState({ isConfirmDeleteOpen: false });

  onEditText = extraState => e =>
    this.updateAttribute(e.target.dataset.key, e.target.value, extraState);

  onRandomizeName = namingFunc => () =>
    this.setState({ entity: { ...this.state.entity, name: namingFunc() } });

  openExportModal = () => this.setState({ isExportOpen: true });

  closeExportModal = () => this.setState({ isExportOpen: false });

  updateAttribute = (key, value, extraState = {}) =>
    this.setState({
      ...extraState,
      [key]: value,
    });

  renderSectorBuilderText() {
    if (
      some(this.props.entityChildren, size) ||
      this.props.entityType !== Entities.sector.key ||
      this.props.isSidebarEditActive
    ) {
      return null;
    }
    return <SectorBuilderInfo />;
  }

  renderConfirmDeleteModal() {
    const entityName = Entities[this.props.entityType].name;
    return (
      <ConfirmModal
        isOpen={this.state.isConfirmDeleteOpen}
        onConfirm={this.onDeleteEntity}
        onCancel={this.onCancelDelete}
      >
        Are you sure you want to delete this {entityName}?
      </ConfirmModal>
    );
  }

  render() {
    const EntitySidebar = Entities[this.props.entityType].Sidebar;
    return (
      <SectorMap match={this.props.match}>
        <EntityNavigation
          name={this.props.entity.name}
          onDeleteEntity={this.onConfirmDelete}
          openExportModal={this.openExportModal}
        >
          <EntitySidebar />
          {this.renderSectorBuilderText()}
          {this.renderConfirmDeleteModal()}
          <ExportModal
            isOpen={this.state.isExportOpen}
            onCancel={this.closeExportModal}
          />
        </EntityNavigation>
      </SectorMap>
    );
  }
}
