import React from 'react';
import PropTypes from 'prop-types';

import SidebarNavigation, { SidebarType } from 'components/sidebar-navigation';
import { SectionHeader, Header4 } from 'primitives';
import WorldTags from 'constants/world-tags';
import { toReadableArray } from 'utils/common';

import './style.css';

const renderTags = tags => tags
  .map(tag => WorldTags[tag])
  .map(({
    key,
    name,
    description,
    enemies,
    friends,
    complications,
    things,
    places,
  }) => (
    <div key={key} className="PlanetInfo-Tag">
      <Header4>{name}</Header4>
      <p className="PlanetInfo-Content">{description}</p>
      <p className="PlanetInfo-Content">
        <b>Enemies: </b>
        {enemies.map(toReadableArray)}
      </p>
      <p className="PlanetInfo-Content">
        <b>Friends: </b>
        {friends.map(toReadableArray)}
      </p>
      <p className="PlanetInfo-Content">
        <b>Complications: </b>
        {complications.map(toReadableArray)}
      </p>
      <p className="PlanetInfo-Content">
        <b>Things: </b>
        {things.map(toReadableArray)}
      </p>
      <p className="PlanetInfo-Content">
        <b>Places: </b>
        {places.map(toReadableArray)}
      </p>
    </div>
  ));

export default function SectorInfo({ planet, location, routeParams }) {
  return (
    <SidebarNavigation
      name={planet.name}
      back={`/sector/system/${routeParams.system}${location.search}`}
      type={SidebarType.planet}
    >
      <SectionHeader>World Tags</SectionHeader>
      <div className="PlanetInfo-Section">
        {renderTags(planet.tags)}
      </div>
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
