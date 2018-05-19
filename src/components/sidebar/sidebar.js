import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some, size } from 'lodash';
import { FormattedMessage, intlShape } from 'react-intl';

import ConfirmModal from 'primitives/modal/confirm-modal';
import Entities from 'constants/entities';
import DefaultSidebar from 'components/sidebar-entities/default-sidebar';
import NoteSidebar from 'components/sidebar-entities/note-sidebar';
import NavigationSidebar from 'components/sidebar-entities/navigation-sidebar';

import SectorBuilderInfo from './sector-builder-info';
import EntityNavigation from './entity-navigation';
import ExportModal from './export-modal';

const ENTITY_SIDEBAR = {
  default: DefaultSidebar,
  note: NoteSidebar,
  navigation: NavigationSidebar,
};

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
    intl: intlShape.isRequired,
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
      this.props.entityType !== Entities.sector.key ||
      this.props.isSidebarEditActive
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
        <FormattedMessage
          id="misc.toDeleteEntity"
          values={{
            entity: this.props.intl.formatMessage({
              id: Entities[this.props.entityType].name,
            }),
          }}
        />
      </ConfirmModal>
    );
  }

  render() {
    const EntitySidebar =
      ENTITY_SIDEBAR[Entities[this.props.entityType].sidebar] ||
      ENTITY_SIDEBAR.default;
    return (
      <EntityNavigation
        name={this.props.entity.name}
        onDeleteEntity={this.onConfirmDelete}
      >
        <EntitySidebar />
        {this.renderSectorBuilderText()}
        {this.renderConfirmDeleteModal()}
        <ExportModal />
      </EntityNavigation>
    );
  }
}
