import React from 'react';
import PropTypes from 'prop-types';

import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';
import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';
import { stringSortByKey } from 'utils/common';

import './style.css';

export default function SectorInfo({ name, systems, location }) {
  return (
    <SidebarNavigation name={name} type={SidebarType.sector}>
      <SectionHeader>Systems</SectionHeader>
      {systems
        .sort(stringSortByKey('key'))
        .map(system => (
          <SidebarLinkRow key={system.key} to={`/sector/system/${system.key}${location.search}`}>
            <Header type={HeaderType.header4} className="SectorInfo-Name">{system.name}</Header>
            <div className="SectorInfo-Key">({system.key})</div>
          </SidebarLinkRow>
        ))}
    </SidebarNavigation>
  );
}

SectorInfo.propTypes = {
  name: PropTypes.string.isRequired,
  systems: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};
