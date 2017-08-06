import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import SidebarLinkRow from 'components/sidebar-link-row';
import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';
import { toCommaArray } from 'utils/common';
import WorldTags from 'constants/world-tags';

import './style.css';

export default function SectorInfo({ system, location }) {
  return (
    <SidebarNavigation
      name={system.name}
      back={`/sector${location.search}`}
      type={SidebarType.system}
    >
      <SectionHeader>Planets</SectionHeader>
      {map(system.planets, planet =>
        <SidebarLinkRow
          key={planet.name}
          to={`${location.pathname}/planet/${planet.name.toLowerCase()}${location.search}`}
        >
          <Header type={HeaderType.header4} className="SystemInfo-Name">
            {planet.name}
          </Header>
          <div className="SystemInfo-Tags">
            ({planet.tags.map(tag => WorldTags[tag].name).map(toCommaArray)})
          </div>
        </SidebarLinkRow>,
      )}
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
