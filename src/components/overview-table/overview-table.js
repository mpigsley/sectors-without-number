import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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

const getColumnsFromType = entityType => {
  const common = [
    {
      accessor: 'name',
      Header: 'Name',
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
      { accessor: 'location', Header: 'Location', centered: true },
      { accessor: 'children', Header: 'Children', centered: true },
      { accessor: 'neighbors', Header: 'Neighbors' },
    ];
  }
  const columns = [
    ...common,
    {
      accessor: 'parent',
      Header: 'Parent',
      Cell: (parent, { parentLink }) => (
        <Link className="OverviewTable-Link" to={parentLink}>
          {parent}
        </Link>
      ),
    },
  ];
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

export default function OverviewTable({
  entities,
  currentSector,
  routeParams,
}) {
  const pluralName = Pluralize(Entities[routeParams.entityType].name);
  if (!size(entities[routeParams.entityType])) {
    return (
      <EmptyOverview>
        You do not have any {pluralName} in this sector
      </EmptyOverview>
    );
  }

  const columns = getColumnsFromType(routeParams.entityType);
  const tableData = values(entities[routeParams.entityType]).sort(
    sortByKey('name'),
  );

  const exportTable = () => {
    const table = [columns.map(col => col.Header)].concat(
      tableData.map(data => columns.map(col => data[col.accessor])),
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
            {Entities[routeParams.entityType].name}
          </Header>
          <Button minimal onClick={exportTable}>
            Export {pluralName}
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
};

OverviewTable.defaultProps = {
  currentSector: {},
};
