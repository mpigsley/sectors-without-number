import React from 'react';
import PropTypes from 'prop-types';

import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';
import { stringSortByKey } from 'utils/common';
import { SectionHeader } from 'primitives';
import { Name, Key } from './components';

export default function SectorInfo({ name, systems, location }) {
  return (
    <SidebarNavigation name={name} type={SidebarType.sector}>
      <SectionHeader>Systems</SectionHeader>
      {systems
        .sort(stringSortByKey('key'))
        .map(system => (
          <SidebarLinkRow key={system.key} to={`/sector/system/${system.key}${location.search}`}>
            <Name>{system.name}</Name>
            <Key>({system.key})</Key>
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
