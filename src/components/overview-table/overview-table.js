import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { values } from 'lodash';

import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import Table from 'primitives/other/table';
import Entities from 'constants/entities';
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

export default function OverviewTable({ entities, routeParams }) {
  return (
    <FlexContainer
      flex="3"
      direction="column"
      align="flexStart"
      className="OverviewTable"
    >
      <Header
        type={HeaderType.header3}
        className="CondensedPrintable-EntityTitle"
      >
        {Entities[routeParams.entityType].name}
      </Header>
      <Table
        className="CondensedPrintable-Table"
        dataIdAccessor="key"
        columns={getColumnsFromType(routeParams.entityType)}
        data={values(entities[routeParams.entityType]).sort(sortByKey('name'))}
      />
    </FlexContainer>
  );
}

OverviewTable.propTypes = {
  entities: PropTypes.shape().isRequired,
  routeParams: PropTypes.shape({
    entityType: PropTypes.string.isRequired,
  }).isRequired,
};
