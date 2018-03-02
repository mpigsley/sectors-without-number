import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import HexMap from 'components/hex-map';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import Entities from 'constants/entities';

import './style.css';
import '../style.css';

const renderEntity = (key, entityType, entity) => (
  <FlexContainer key={key} className="ExpandedPrintable-Entity">
    <FlexContainer align="baseline" className="ExpandedPrintable-Header">
      <Header type={HeaderType.header2} dark>
        {entity.name}
      </Header>
      <Header type={HeaderType.header4} dark className="ExpandedPrintable-Type">
        ({Entities[entityType].name})
      </Header>
    </FlexContainer>
  </FlexContainer>
);

const renderEntities = entities =>
  map(entities, (entityList, entityType) =>
    map(entityList, (entity, entityId) =>
      renderEntity(entityId, entityType, entity),
    ),
  );

export default function ExpandedPrintable({ printable, entities }) {
  return (
    <div className="Printable">
      <div className="Printable-Container">
        <HexMap hexes={printable.hexes} viewbox={printable.viewbox} />
      </div>
      <div className="Printable-EntityContainer">
        {renderEntities(entities)}
      </div>
    </div>
  );
}

ExpandedPrintable.propTypes = {
  entities: PropTypes.shape().isRequired,
  printable: PropTypes.shape({
    hexes: PropTypes.arrayOf(PropTypes.object).isRequired,
    viewbox: PropTypes.string.isRequired,
  }).isRequired,
};
