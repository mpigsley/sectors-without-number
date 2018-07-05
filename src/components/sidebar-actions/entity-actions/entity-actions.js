import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import ActionLayout from 'components/sidebar-actions/action-layout';
import ConfirmModal from 'primitives/modal/confirm-modal';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

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
    this.onCancelDelete();
    this.props.deleteEntity();
  };

  get backUrl() {
    let backUrl = '/';
    const isSpecialEntity =
      [Entities.navigation.key, Entities.layer.key].indexOf(
        this.props.entityType,
      ) !== -1;
    if (this.props.entity.parent || isSpecialEntity) {
      backUrl = `${backUrl}sector/${this.props.currentSector}`;
      if (
        this.props.entity.parentEntity &&
        this.props.entity.parentEntity !== Entities.sector.key
      ) {
        backUrl = `${backUrl}/${this.props.entity.parentEntity}/${
          this.props.entity.parent
        }`;
      }
    }
    return backUrl;
  }

  buildActions = () => {
    const actions = [];
    if (!this.props.isSaved && !this.props.isShared) {
      actions.push({
        key: 'save',
        children: this.props.intl.formatMessage({ id: 'misc.save' }),
        onClick: this.props.saveSector,
      });
    }
    if (!this.props.isShared) {
      actions.push({
        key: 'edit',
        children: this.props.intl.formatMessage({ id: 'misc.edit' }),
        onClick: this.props.activateSidebarEdit,
      });
    }
    if (this.props.isSaved && !this.props.isShared) {
      actions.push({
        key: 'delete',
        children: this.props.intl.formatMessage({ id: 'misc.delete' }),
        onClick: this.onConfirmDelete,
      });
    }

    return actions;
  };

  renderFooter = () => {
    if (!this.props.isSidebarEditActive) {
      return null;
    }
    return (
      <FlexContainer>
        <button
          className="EntityActions-FooterButton EntityActions-Cancel"
          onClick={this.props.deactivateSidebarEdit}
        >
          <FormattedMessage id="misc.cancel" />
        </button>
        <button
          className="EntityActions-FooterButton EntityActions-Save"
          onClick={this.props.saveEntityEdit}
        >
          <FormattedMessage id="misc.save" />
        </button>
      </FlexContainer>
    );
  };

  renderSectorBuilderText() {
    if (
      some(this.props.entityChildren, size) ||
      this.props.entityType !== Entities.sector.key ||
      this.props.isSidebarEditActive
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
    return (
      <ActionLayout
        renderActions={!this.props.isSidebarEditActive}
        backUrl={this.backUrl}
        actions={this.buildActions()}
        footer={this.renderFooter()}
        name={[
          <Header key="header" type={HeaderType.header2}>
            {this.props.entity.name}
          </Header>,
          <Header
            key="sub-header"
            type={HeaderType.header3}
            className="EntityActions-TypeHeader"
          >
            (<FormattedMessage id={Entities[this.props.entityType].name} />)
          </Header>,
        ]}
      >
        {this.renderSectorBuilderText()}
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
                id: Entities[this.props.entityType].name,
              }),
            }}
          />
        </ConfirmModal>
      </ActionLayout>
    );
  }
}
