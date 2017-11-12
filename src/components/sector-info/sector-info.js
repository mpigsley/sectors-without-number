import React from 'react';
import PropTypes from 'prop-types';
import { RefreshCw, Plus } from 'react-feather';
import { size } from 'lodash';

import SidebarInfo from 'components/sidebar-info';
import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';
import SystemEditModal from 'components/system-edit-modal';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Modal from 'primitives/modal/modal';
import SectionHeader from 'primitives/text/section-header';
import Button from 'primitives/other/button';
import LinkIcon from 'primitives/other/link-icon';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';

import { stringSortByKey } from 'utils/common';
import { generateSectorName } from 'utils/name-generator';

import './style.css';

export default class SectorInfo extends SidebarInfo {
  static propTypes = {
    sector: PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      systems: PropTypes.shape().isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    editSectorName: PropTypes.func.isRequired,
    deleteSector: PropTypes.func.isRequired,
    editSystem: PropTypes.func.isRequired,
    isSaved: PropTypes.bool.isRequired,
    isCloudSave: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.sector.name,
      isConfirmDeleteOpen: false,
      isAddSystemOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sector.name !== this.props.sector.name) {
      this.setState({
        name: nextProps.sector.name,
      });
    }
  }

  onSaveSector = () => {
    this.props.editSectorName(this.state.name);
    this.onClose();
  };

  onDeleteSector = key => () => {
    this.onCancelDelete();
    this.props.deleteSector(key);
  };

  onCreateSystem = system => {
    this.props.editSystem(system);
    this.setState({ isAddSystemOpen: false });
  };

  renderEditModal() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onCancel={this.onClose}
        title="Edit Sector"
        actionButtons={[
          <Button primary key="save" onClick={this.onSaveSector}>
            Save Sector
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
    if (size(this.props.sector.systems)) {
      if (this.props.isCloudSave) {
        return <SectionHeader>Systems</SectionHeader>;
      }
      return (
        <SectionHeader>
          <FlexContainer justify="spaceBetween" align="flexEnd">
            Systems
            <Button
              minimal
              className="SectorInfo-AddButton"
              onClick={() => this.setState({ isAddSystemOpen: true })}
            >
              <LinkIcon size={15} icon={Plus} />
              Add System
            </Button>
          </FlexContainer>
        </SectionHeader>
      );
    }
    return (
      <FlexContainer
        className="SectorInfo-Welcome"
        justify="center"
        direction="column"
        align="center"
      >
        <Header type={HeaderType.header3}>Welcome to the Sector Builder</Header>
        <ol className="SectorInfo-WelcomeList">
          <li className="SectorInfo-WelcomeItem">
            To <b>create a system</b> click and hold a hex to the left.
          </li>
          <li className="SectorInfo-WelcomeItem">
            To <b>move an existing system</b> click, hold, and drag.
          </li>
          <li className="SectorInfo-WelcomeItem">
            <b>Create and edit planets</b> here from the sidebar.
          </li>
        </ol>
      </FlexContainer>
    );
  }

  render() {
    return (
      <SidebarNavigation
        name={this.props.sector.name}
        type={SidebarType.sector}
        onEdit={this.onEdit}
        onDelete={this.props.isSaved ? this.onConfirmDelete : undefined}
      >
        {this.renderEmptyText()}
        {Object.keys(this.props.sector.systems)
          .map(key => this.props.sector.systems[key])
          .sort(stringSortByKey('key'))
          .map(system => (
            <SidebarLinkRow
              key={system.key}
              to={`${this.props.location.pathname}/system/${system.key}`}
            >
              <Header type={HeaderType.header4} className="SectorInfo-Name">
                {system.name}
              </Header>
              <div className="SectorInfo-Key">({system.key})</div>
            </SidebarLinkRow>
          ))}
        {this.renderEditModal()}
        {this.renderConfirmModal(
          this.onDeleteSector(this.props.sector.key),
          'sector',
        )}
        <SystemEditModal
          isOpen={this.state.isAddSystemOpen}
          onClose={() => this.setState({ isAddSystemOpen: false })}
          onSubmit={this.onCreateSystem}
        />
      </SidebarNavigation>
    );
  }
}
