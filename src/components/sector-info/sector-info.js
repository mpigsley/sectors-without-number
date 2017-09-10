import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';
import Header, { HeaderType } from 'primitives/text/header';
import Modal from 'primitives/other/modal';
import SectionHeader from 'primitives/text/section-header';
import Button from 'primitives/other/button';
import { stringSortByKey } from 'utils/common';

import './style.css';

export default class SectorInfo extends Component {
  static propTypes = {
    sector: PropTypes.shape({
      name: PropTypes.string.isRequired,
      systems: PropTypes.shape().isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  state = {
    isOpen: false,
  };

  onEdit() {
    this.setState({ isOpen: true });
  }

  onClose() {
    this.setState({ isOpen: false });
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
            <Button primary key="save">
              Save Sector
            </Button>,
          ]}
        >
          <p>some input element... blah blah</p>
        </Modal>
      </SidebarNavigation>
    );
  }
}
