import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import ActionLayout from 'components/sidebar-actions/action-layout';
import ConfirmModal from 'primitives/modal/confirm-modal';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import SaveFooter from 'primitives/other/save-footer';

import Entities from 'constants/entities';
import { some, size } from 'constants/lodash';

import './style.css';

export default class EntityActions extends Component {
  static propTypes = {
    currentSector: PropTypes.string.isRequired,
    entityChildren: PropTypes.shape().isRequired,
    entity: PropTypes.shape({
      name: PropTypes.string.isRequired,
      parent: PropTypes.string,
      parentEntity: PropTypes.string,
    }).isRequired,
    entityType: PropTypes.string,
    children: PropTypes.node.isRequired,
    activateSidebarEdit: PropTypes.func.isRequired,
    deactivateSidebarEdit: PropTypes.func.isRequired,
    saveEntityEdit: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    saveSector: PropTypes.func.isRequired,
    isSaved: PropTypes.bool.isRequired,
    isShared: PropTypes.bool.isRequired,
    isSidebarEditActive: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    entityType: undefined,
  };

  state = {
    isConfirmDeleteOpen: false,
  };

  onConfirmDelete = () => this.setState({ isConfirmDeleteOpen: true });

  onCancelDelete = () => this.setState({ isConfirmDeleteOpen: false });

  onDeleteEntity = () => {
    const { deleteEntity } = this.props;
    this.onCancelDelete();
    deleteEntity();
  };

  get backUrl() {
    const { entityType, entity, currentSector } = this.props;
    let backUrl = '/';
    const isSpecialEntity =
      [Entities.navigation.key, Entities.layer.key].indexOf(entityType) !== -1;
    if (entity.parent || isSpecialEntity) {
      backUrl = `${backUrl}sector/${currentSector}`;
      if (entity.parentEntity && entity.parentEntity !== Entities.sector.key) {
        backUrl = `${backUrl}/${entity.parentEntity}/${entity.parent}`;
      }
    }
    return backUrl;
  }

  buildActions = () => {
    const {
      isSaved,
      isShared,
      intl,
      saveSector,
      activateSidebarEdit,
    } = this.props;
    const actions = [];
    if (!isSaved && !isShared) {
      actions.push({
        key: 'save',
        children: intl.formatMessage({ id: 'misc.save' }),
        onClick: saveSector,
      });
    }
    if (!isShared) {
      actions.push({
        key: 'edit',
        children: intl.formatMessage({ id: 'misc.edit' }),
        onClick: activateSidebarEdit,
      });
    }
    if (isSaved && !isShared) {
      actions.push({
        key: 'delete',
        children: intl.formatMessage({ id: 'misc.delete' }),
        onClick: this.onConfirmDelete,
      });
    }

    return actions;
  };

  renderFooter = () => {
    const {
      isSidebarEditActive,
      deactivateSidebarEdit,
      saveEntityEdit,
    } = this.props;
    if (!isSidebarEditActive) {
      return null;
    }
    return (
      <SaveFooter onCancel={deactivateSidebarEdit} onSave={saveEntityEdit} />
    );
  };

  renderSectorBuilderText() {
    const { entityChildren, entityType, isSidebarEditActive } = this.props;
    if (
      some(entityChildren, size) ||
      entityType !== Entities.sector.key ||
      isSidebarEditActive
    ) {
      return null;
    }
    return (
      <FlexContainer
        className="EntityActions-Welcome"
        justify="center"
        direction="column"
        align="center"
      >
        <Header type={HeaderType.header3}>
          <FormattedMessage id="misc.welcomeBuilder" />
        </Header>
        <ol className="EntityActions-WelcomeList">
          <li className="EntityActions-WelcomeItem">
            <FormattedMessage id="misc.createASystem" />
          </li>
          <li className="EntityActions-WelcomeItem">
            <FormattedMessage id="misc.moveSystem" />
          </li>
          <li className="EntityActions-WelcomeItem">
            <FormattedMessage id="misc.createEditPlanets" />
          </li>
        </ol>
      </FlexContainer>
    );
  }

  render() {
    const {
      isSidebarEditActive,
      entity,
      entityType,
      children,
      intl,
    } = this.props;
    const { isConfirmDeleteOpen } = this.state;
    return (
      <ActionLayout
        renderActions={!isSidebarEditActive}
        backUrl={this.backUrl}
        actions={this.buildActions()}
        footer={this.renderFooter()}
        name={[
          <Header key="header" type={HeaderType.header2}>
            {entity.name}
          </Header>,
          <Header
            key="sub-header"
            type={HeaderType.header3}
            className="EntityActions-TypeHeader"
          >
            (<FormattedMessage id={Entities[entityType].name} />)
          </Header>,
        ]}
      >
        {this.renderSectorBuilderText()}
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
                id: Entities[entityType].name,
              }),
            }}
          />
        </ConfirmModal>
      </ActionLayout>
    );
  }
}
