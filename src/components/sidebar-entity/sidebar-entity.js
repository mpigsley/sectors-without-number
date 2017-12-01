import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some, size, map } from 'lodash';

import ConfirmModal from 'primitives/modal/confirm-modal';

import Entities from 'constants/entities';

import SectorBuilderInfo from './sector-builder-info';
import EntityAttributes from './entity-attributes';
import EntityList from './entity-list';
import EntityNavigation from './entity-navigation';

import './style.css';

export default class EntityInfo extends Component {
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
  };

  static defaultProps = {
    entityType: undefined,
  };

  state = {
    entity: { ...this.props.entity },
    isConfirmDeleteOpen: false,
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

  updateAttribute = (key, value, extraState = {}) =>
    this.setState({
      ...extraState,
      [key]: value,
    });

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
    return (
      <EntityNavigation name={this.props.entity.name}>
        <EntityAttributes
          attributes={this.props.entity.attributes}
          entityType={this.props.entityType}
        />
        {map(this.props.entityChildren, (entities, entityType) => (
          <EntityList
            key={entityType}
            entities={entities}
            entityType={entityType}
          />
        ))}
        {this.renderSectorBuilderText()}
        {this.renderConfirmDeleteModal()}
      </EntityNavigation>
    );
  }
}
