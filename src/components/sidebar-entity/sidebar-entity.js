import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some, size, map, mapValues } from 'lodash';

import ConfirmModal from 'primitives/modal/confirm-modal';

import Entities from 'constants/entities';

import SectorBuilderInfo from './sector-builder-info';
import EntityAttributes from './entity-attributes';
import EntityList from './entity-list';
import EntityNavigation from './entity-navigation';

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
    isSidebarEditActive: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    entityType: undefined,
  };

  state = {
    entity: { ...this.props.entity },
    isConfirmDeleteOpen: false,
    openLists: {
      ...mapValues(this.props.entityChildren, () => true),
      attributes: true,
      tags: true,
    },
  };

  componentWillReceiveProps(nextProps) {
    let update = {};
    if (nextProps.entity.name !== this.props.entity.name) {
      update = { entity: nextProps.entity };
    }
    if (nextProps.entityType !== this.props.entityType) {
      update = {
        ...update,
        openLists: {
          ...mapValues(nextProps.entityChildren, () => true),
          attributes: true,
          tags: true,
        },
      };
    }
    this.setState(update);
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

  toggleListOpen = entityType => () =>
    this.setState({
      openLists: {
        ...this.state.openLists,
        [entityType]: !this.state.openLists[entityType],
      },
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
    return (
      <EntityNavigation
        name={this.props.entity.name}
        onDeleteEntity={this.onConfirmDelete}
      >
        <EntityAttributes
          isAttributesOpen={this.state.openLists.attributes}
          isTagsOpen={this.state.openLists.tags}
          toggleAttributesOpen={this.toggleListOpen('attributes')}
          toggleTagsOpen={this.toggleListOpen('tags')}
        />
        {map(this.props.entityChildren, (entities, entityType) => (
          <EntityList
            key={entityType}
            entities={entities}
            entityType={entityType}
            isOpen={this.state.openLists[entityType]}
            toggleListOpen={this.toggleListOpen(entityType)}
          />
        ))}
        {this.renderSectorBuilderText()}
        {this.renderConfirmDeleteModal()}
      </EntityNavigation>
    );
  }
}
