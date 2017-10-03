import React from 'react';
import PropTypes from 'prop-types';
import { RefreshCw } from 'react-feather';

import SidebarInfo from 'components/sidebar-info';
import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';

import Header, { HeaderType } from 'primitives/text/header';
import Modal from 'primitives/other/modal';
import SectionHeader from 'primitives/text/section-header';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import IconInput from 'primitives/form/icon-input';

import { stringSortByKey } from 'utils/common';
import { generateSectorName } from 'utils/name-generator';

import './style.css';

export default class SectorInfo extends SidebarInfo {
  static propTypes = {
    sector: PropTypes.shape({
      name: PropTypes.string.isRequired,
      systems: PropTypes.shape().isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    editSectorName: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onSaveSector = this.onSaveSector.bind(this);
    this.state = {
      name: this.props.sector.name,
    };
  }

  onSaveSector() {
    this.props.editSectorName(this.state.name);
    this.onClose();
  }

  render() {
    return (
      <SidebarNavigation
        name={this.props.sector.name}
        type={SidebarType.sector}
        onEdit={this.onEdit}
      >
        <SectionHeader>Systems</SectionHeader>
        {Object.keys(this.props.sector.systems)
          .map(key => this.props.sector.systems[key])
          .sort(stringSortByKey('key'))
          .map(system => (
            <SidebarLinkRow
              key={system.key}
              to={`/sector/system/${system.key}${this.props.location.search}`}
            >
              <Header type={HeaderType.header4} className="SectorInfo-Name">
                {system.name}
              </Header>
              <div className="SectorInfo-Key">({system.key})</div>
            </SidebarLinkRow>
          ))}
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
            onChange={this.onEditText}
            onIconClick={this.onRandomizeName(generateSectorName)}
          />
        </Modal>
      </SidebarNavigation>
    );
  }
}
