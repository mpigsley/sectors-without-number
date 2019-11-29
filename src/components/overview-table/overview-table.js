import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape, FormattedMessage } from 'react-intl';
import Pluralize from 'pluralize';

import EmptyOverview from 'components/empty-overview';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import Table from 'primitives/other/table';
import Button from 'primitives/other/button';
import Entities from 'constants/entities';

import { generateCSV, createCSVDownload } from 'utils/export';
import { sortByKey } from 'utils/common';
import { values, size } from 'constants/lodash';

import './style.scss';

export default function OverviewTable({
  entities,
  match,
  currentSector,
  intl,
}) {
  const pluralName = intl.formatMessage({
    id: Pluralize(Entities[match.params.entityType].name),
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
      { accessor: 'location', Header: 'misc.location', centered: true },
    ];
    const attributes = Entities[entityType].attributes.map(({ key, name }) => ({
      accessor: key,
      Header: name,
      translateItem: true,
    }));
    if (Entities[entityType].topLevel) {
      return [
        ...common,
        { accessor: 'children', Header: 'misc.children', centered: true },
        { accessor: 'neighbors', Header: 'misc.neighbors' },
        ...attributes,
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
    attributes.map(attr => columns.push(attr));
    if (Entities[entityType].tags) {
      columns.push({
        accessor: 'tags',
        Header: 'misc.tags',
        Cell: tags =>
          tags
            .map(tag => intl.formatMessage({ id: `tags.${tag}` }))
            .join(', ') || '-',
      });
    }
    return columns;
  };

  if (!size(entities[match.params.entityType])) {
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

  const columns = getColumnsFromType(match.params.entityType);
  const tableData = values(entities[match.params.entityType]).sort(
    sortByKey('name'),
  );

  const exportTable = () => {
    const table = [
      columns.map(col => intl.formatMessage({ id: col.Header })),
    ].concat(
      tableData.map(data =>
        columns.map(({ accessor, translateItem }) =>
          translateItem && intl.messages[data[accessor]]
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
            {intl.formatMessage({ id: Entities[match.params.entityType].name })}
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      entityType: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};

OverviewTable.defaultProps = {
  currentSector: {},
};
