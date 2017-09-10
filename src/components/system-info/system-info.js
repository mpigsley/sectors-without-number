import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import SidebarInfo from 'components/sidebar-info';
import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';

import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';
import Modal from 'primitives/other/modal';
import Button from 'primitives/other/button';

import { toCommaArray } from 'utils/common';
import WorldTags from 'constants/world-tags';

import './style.css';

export default class SectorInfo extends SidebarInfo {
  static propTypes = {
    system: PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      planets: PropTypes.shape(),
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <SidebarNavigation
        name={this.props.system.name}
        back={`/sector${this.props.location.search}`}
        type={SidebarType.system}
        onEdit={this.onEdit}
      >
        <SectionHeader>Planets</SectionHeader>
        {map(this.props.system.planets, planet => (
          <SidebarLinkRow
            key={planet.name}
            to={`${this.props.location
              .pathname}/planet/${planet.name.toLowerCase()}${this.props
              .location.search}`}
          >
            <Header type={HeaderType.header4} className="SystemInfo-Name">
              {planet.name}
            </Header>
            <div className="SystemInfo-Tags">
              ({planet.tags
                .map(tag => WorldTags[tag].name)
                .map(toCommaArray)
                .join('')})
            </div>
          </SidebarLinkRow>
        ))}
        <Modal
          isOpen={this.state.isOpen}
          onCancel={this.onClose}
          title="Edit System"
          actionButtons={[
            <Button primary key="save">
              Save System
            </Button>,
          ]}
        >
          <p>some input element... blah blah</p>
        </Modal>
      </SidebarNavigation>
    );
  }
}
