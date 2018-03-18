import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { intlShape, FormattedMessage } from 'react-intl';
import { values, size } from 'lodash';
import Pluralize from 'pluralize';

import EmptyOverview from 'components/empty-overview';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import Table from 'primitives/other/table';
import Button from 'primitives/other/button';
import Entities from 'constants/entities';

import { generateCSV, createCSVDownload } from 'utils/export';
import { sortByKey } from 'utils/common';
import './style.css';

export default function OverviewTable({
  entities,
  routeParams,
  currentSector,
  intl,
}) {
  const pluralName = intl.formatMessage({
    id: Pluralize(Entities[routeParams.entityType].name),
  });

  const getColumnsFromType = entityType => {
    const common = [
      {
        accessor: 'name',
        Header: 'misc.name',
        Cell: (name, { link }) => (
          <Link className="OverviewTable-Link" to={link}>
            {name}
          </Link>
        ),
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
        Cell: (parent, { parentLink, parentType }) => (
          <Link className="OverviewTable-Link" to={parentLink}>
            {parent} ({intl.formatMessage({ id: parentType })})
          </Link>
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
        columns.push({ accessor: key, Header: name, translateItem: true });
      });
    }
    if (Entities[entityType].tags) {
      columns.push({ accessor: 'tags', Header: 'misc.tags' });
    }
    return columns;
  };

  if (!size(entities[routeParams.entityType])) {
    return (
      <EmptyOverview>
        <FormattedMessage
          id="misc.noEntities"
          values={{
            entities: pluralName,
          }}
        />
      </EmptyOverview>
    );
  }

  const columns = getColumnsFromType(routeParams.entityType);
  const tableData = values(entities[routeParams.entityType]).sort(
    sortByKey('name'),
  );

  const exportTable = () => {
    const table = [
      columns.map(col => intl.formatMessage({ id: col.Header })),
    ].concat(
      tableData.map(data =>
        columns.map(
          ({ accessor, translateItem }) =>
            translateItem
              ? intl.formatMessage({ id: data[accessor] })
              : data[accessor],
        ),
      ),
    );
    return createCSVDownload(
      generateCSV(table),
      `${currentSector.name} - ${pluralName}`,
    );
  };

  return (
    <FlexContainer
      flex="3"
      direction="column"
      align="flexStart"
      className="OverviewTable"
    >
      <div className="OverviewTable-FlexWrap">
        <FlexContainer justify="spaceBetween" align="baseline">
          <Header type={HeaderType.header3}>
            {intl.formatMessage({ id: Entities[routeParams.entityType].name })}
          </Header>
          <Button minimal onClick={exportTable}>
            <FormattedMessage
              id="misc.exportEntity"
              values={{
                entity: pluralName,
              }}
            />
          </Button>
        </FlexContainer>
      </div>
      <Table
        sortable
        className="OverviewTable-Table"
        dataIdAccessor="key"
        columns={columns}
        data={tableData}
      />
    </FlexContainer>
  );
}

OverviewTable.propTypes = {
  entities: PropTypes.shape().isRequired,
  currentSector: PropTypes.shape({
    name: PropTypes.string,
  }),
  routeParams: PropTypes.shape({
    entityType: PropTypes.string.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};

OverviewTable.defaultProps = {
  currentSector: {},
};
