import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';
import { SectionHeader } from 'primitives';
import { toCommaArray } from 'utils/common';
import WorldTags from 'constants/world-tags';
import Name from './components';

import './style.css';

export default function SectorInfo({ system, location }) {
  return (
    <SidebarNavigation
      name={system.name}
      back={`/sector${location.search}`}
      type={SidebarType.system}
    >
      <SectionHeader>Planets</SectionHeader>
      {map(system.planets, planet => (
        <SidebarLinkRow
          key={planet.name}
          to={`${location.pathname}/planet/${planet.name.toLowerCase()}${location.search}`}
        >
          <Name>{planet.name}</Name>
          <div className="SystemInfo-Tags">
            ({planet.tags
              .map(tag => WorldTags[tag].name)
              .map(toCommaArray)})
          </div>
        </SidebarLinkRow>
      ))}
    </SidebarNavigation>
  );
}

SectorInfo.propTypes = {
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
