import React from 'react';
import PropTypes from 'prop-types';
import { map, values } from 'lodash';

import HexMap from 'components/hex-map';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import Table from 'primitives/other/table';

import { sortByKey } from 'utils/common';
import Entities from 'constants/entities';

import './style.css';
import '../style.css';

const getColumnsFromType = entityType => {
  const common = [{ accessor: 'name', Header: 'Name' }];
  if (Entities[entityType].topLevel) {
    return [
      ...common,
      { accessor: 'location', Header: 'Location', centered: true },
      { accessor: 'children', Header: 'Children', centered: true },
      { accessor: 'neighbors', Header: 'Neighbors' },
    ];
  }
  const columns = [...common, { accessor: 'parent', Header: 'Parent' }];
  if (Entities[entityType].children.length) {
    columns.splice(2, 0, {
      accessor: 'children',
      Header: 'Children',
      centered: true,
    });
  }
  if ((Entities[entityType].attributes || []).length) {
    Entities[entityType].attributes.forEach(({ key, name }) => {
      columns.push({ accessor: key, Header: name });
    });
  }
  if (Entities[entityType].tags) {
    columns.push({ accessor: 'tags', Header: 'Tags' });
  }
  return columns;
};

const renderEntityType = (
  { entityType, ...entities }, // eslint-disable-line
) => (
  <FlexContainer
    key={entityType}
    direction="column"
    align="flexStart"
    className="CondensedPrintable-Entity"
  >
    <Header
      dark
      type={HeaderType.header3}
      className="CondensedPrintable-EntityTitle"
    >
      {Entities[entityType].name}
    </Header>
    <Table
      light
      condensed
      className="CondensedPrintable-Table"
      dataIdAccessor="key"
      columns={getColumnsFromType(entityType)}
      data={values(entities).sort(sortByKey('name'))}
    />
  </FlexContainer>
);

const renderEntities = entities =>
  map(entities, (entity, entityType) => ({ ...entity, entityType }))
    .sort(sortByKey('entityType'))
    .map(renderEntityType);

export default function CondensedPrintable({ printable, entities }) {
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

CondensedPrintable.propTypes = {
  entities: PropTypes.shape().isRequired,
  printable: PropTypes.shape({
    hexes: PropTypes.arrayOf(PropTypes.object).isRequired,
    viewbox: PropTypes.string.isRequired,
  }).isRequired,
};
