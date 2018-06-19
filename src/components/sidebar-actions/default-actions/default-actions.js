import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import { FormattedMessage, intlShape } from 'react-intl';

import ExportModal from 'components/export-modal';
import ConfirmModal from 'primitives/modal/confirm-modal';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';
import ButtonLink from 'primitives/other/button-link';

import Entities from 'constants/entities';
import { some, size } from 'constants/lodash';

import './style.css';

export default class DefaultActions extends Component {
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
    openExport: PropTypes.func.isRequired,
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

  onCopy = () => {
    let url = window.location.href;
    const split = url.split('/');
    if (split.length === 7) {
      url = split.slice(0, 5).join('/');
    }
    copy(url);
    toastr.success(
      this.props.intl.formatMessage({ id: 'misc.clipboardCopy' }),
      this.props.intl.formatMessage(
        { id: 'misc.copiedLinkTo' },
        {
          entity: this.props.intl.formatMessage({
            id: Entities[this.props.entityType].name,
          }),
        },
      ),
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
        className="DefaultActions-Welcome"
        justify="center"
        direction="column"
        align="center"
      >
        <Header type={HeaderType.header3}>
          <FormattedMessage id="misc.welcomeBuilder" />
        </Header>
        <ol className="DefaultActions-WelcomeList">
          <li className="DefaultActions-WelcomeItem">
            <FormattedMessage id="misc.createASystem" />
          </li>
          <li className="DefaultActions-WelcomeItem">
            <FormattedMessage id="misc.moveSystem" />
          </li>
          <li className="DefaultActions-WelcomeItem">
            <FormattedMessage id="misc.createEditPlanets" />
          </li>
        </ol>
      </FlexContainer>
    );
  }

  renderSaveButton = () => {
    if (this.props.isSaved || this.props.isShared) {
      return null;
    }
    return (
      <Button minimal onClick={this.props.saveSector}>
        <FormattedMessage id="misc.save" />
      </Button>
    );
  };

  renderEditButton = () => {
    if (this.props.isShared) {
      return null;
    }
    return (
      <Button minimal onClick={this.props.activateSidebarEdit}>
        <FormattedMessage id="misc.edit" />
      </Button>
    );
  };

  renderShareButton = () => {
    if (!this.props.isSaved || this.props.isShared) {
      return null;
    }
    return (
      <Button minimal onClick={this.onCopy}>
        <FormattedMessage id="misc.share" />
      </Button>
    );
  };

  renderDeleteButton = () => {
    if (!this.props.isSaved || this.props.isShared) {
      return null;
    }
    return (
      <Button minimal onClick={this.onConfirmDelete}>
        <FormattedMessage id="misc.delete" />
      </Button>
    );
  };

  render() {
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

    let footer = (
      <div className="DefaultActions-Footer">
        <FlexContainer justify="center">
          <ButtonLink
            minimal
            to="https://www.patreon.com/sectorswithoutnumber"
            target="_blank"
            className="DefaultActions-Patreon"
          >
            <FormattedMessage id="misc.becomePatron" />
          </ButtonLink>
        </FlexContainer>
      </div>
    );

    let subHeader = null;
    if (!this.props.isSidebarEditActive) {
      const saveButton = this.renderSaveButton();
      const editButton = this.renderEditButton();
      const deleteButton = this.renderDeleteButton();
      const shareButton = this.renderShareButton();
      subHeader = (
        <FlexContainer
          justify="center"
          shrink="0"
          className="DefaultActions-SubHeader"
        >
          <ButtonLink minimal to={backUrl}>
            <FormattedMessage id="misc.back" />
          </ButtonLink>
          <span className="DefaultActions-Spacer" />
          {saveButton}
          {saveButton ? <span className="DefaultActions-Spacer" /> : null}
          {editButton}
          {editButton ? <span className="DefaultActions-Spacer" /> : null}
          {deleteButton}
          {deleteButton ? <span className="DefaultActions-Spacer" /> : null}
          {shareButton}
          {shareButton ? <span className="DefaultActions-Spacer" /> : null}
          <Button minimal onClick={this.props.openExport}>
            <FormattedMessage id="misc.export" />
          </Button>
        </FlexContainer>
      );
    } else {
      footer = (
        <FlexContainer>
          <button
            className="DefaultActions-FooterButton DefaultActions-Cancel"
            onClick={this.props.deactivateSidebarEdit}
          >
            <FormattedMessage id="misc.cancel" />
          </button>
          <button
            className="DefaultActions-FooterButton DefaultActions-Save"
            onClick={this.props.saveEntityEdit}
          >
            <FormattedMessage id="misc.save" />
          </button>
        </FlexContainer>
      );
    }

    return (
      <FlexContainer className="DefaultActions-Info" direction="column">
        <div className="DefaultActions-Header">
          <FlexContainer align="center" shrink="0">
            <FlexContainer flex="1" justify="center" align="flexEnd">
              <Header type={HeaderType.header2}>
                {this.props.entity.name}
              </Header>
              <Header
                type={HeaderType.header3}
                className="DefaultActions-TypeHeader"
              >
                (<FormattedMessage id={Entities[this.props.entityType].name} />)
              </Header>
            </FlexContainer>
          </FlexContainer>
          {subHeader}
        </div>
        <FlexContainer direction="column" flex="1" scroll>
          {this.props.children}
        </FlexContainer>
        {footer}
        <ExportModal />
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
      </FlexContainer>
    );
  }
}
