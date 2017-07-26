import React from 'react';
import PropTypes from 'prop-types';

import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import { SectionHeader } from 'primitives';

export default function SectorInfo({ planet, location, routeParams }) {
  return (
    <SidebarNavigation
      name={planet.name}
      back={`/sector/system/${routeParams.system}${location.search}`}
      type={SidebarType.planet}
    >
      <SectionHeader>{planet.name}</SectionHeader>
    </SidebarNavigation>
  );
}

SectorInfo.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  routeParams: PropTypes.shape({
    system: PropTypes.string.isRequired,
    planet: PropTypes.string.isRequired,
  }).isRequired,
};
