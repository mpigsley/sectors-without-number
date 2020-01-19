import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';

import MapPrintable from 'components/printables/map-printable';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import Table from 'primitives/other/table';

import { map, values } from 'constants/lodash';
import { sortByKey } from 'utils/common';
import Entities from 'constants/entities';

import './style.scss';
import '../style.scss';

export default function CondensedPrintable({
  endPrint,
  entities,
  printable,
  intl,
  customTags,
}) {
  useEffect(() => {
    setTimeout(() => {
      window.print();
      endPrint();
    }, 1);
  }, [endPrint]);

  const getColumnsFromType = entityType => {
    const common = [
      { accessor: 'name', Header: 'misc.name' },
      {
        accessor: 'tags',
        Header: 'misc.tags',
        Cell: tags =>
          tags
            .map(tag =>
              intl.formatMessage({
                id: `tags.${tag}`,
                defaultMessage: (customTags[tag] || {}).name,
              }),
            )
            .filter(tag => tag)
            .join(', ') || '-',
      },
    ];
    if (Entities[entityType].topLevel) {
      return [
        ...common,
        { accessor: 'location', Header: 'misc.location', centered: true },
        { accessor: 'children', Header: 'misc.children', centered: true },
        { accessor: 'neighbors', Header: 'misc.neighbors' },
      ];
    }
    const columns = [
      ...common,
      {
        accessor: 'parent',
        Header: 'misc.parent',
        Cell: (parent, { parentType }) => (
          <span>
            {parent} (<FormattedMessage id={parentType} />)
          </span>
        ),
      },
    ];
    if (Entities[entityType].children.length) {
      columns.splice(2, 0, {
        accessor: 'children',
        Header: 'misc.children',
        centered: true,
      });
    }
    if ((Entities[entityType].attributes || []).length) {
      Entities[entityType].attributes.forEach(({ key, name }) => {
        columns.push({ accessor: key, Header: name });
      });
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
        <FormattedMessage id={Entities[entityType].name} />
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

  const renderEntities = () =>
    map(entities, (entity, entityType) => ({ ...entity, entityType }))
      .sort(sortByKey('entityType'))
      .map(renderEntityType);

  return (
    <div className="Printable">
      <div className="Printable-Container">
        <MapPrintable hexes={printable.hexes} viewbox={printable.viewbox} />
      </div>
      <div className="Printable-EntityContainer">{renderEntities()}</div>
    </div>
  );
}

CondensedPrintable.propTypes = {
  entities: PropTypes.shape().isRequired,
  printable: PropTypes.shape({
    hexes: PropTypes.arrayOf(PropTypes.object).isRequired,
    viewbox: PropTypes.string.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
  endPrint: PropTypes.func.isRequired,
  customTags: PropTypes.shape().isRequired,
};
