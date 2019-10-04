import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Table from 'primitives/other/table';

import { without, includes } from 'constants/lodash';
import { PlusCircle, Circle } from 'constants/icons';

import './style.scss';

export default class CollapsibleTable extends Component {
  constructor(props) {
    super(props);

    const { data, dataIdAccessor } = props;
    this.state = {
      openRows: data.map(row => row[dataIdAccessor]),
    };
  }

  get filteredData() {
    const { data, dataIdAccessor } = this.props;
    const { openRows } = this.state;
    return data.reduce((allData, { children, ...parentRow }) => {
      const isRowOpen = includes(openRows, parentRow[dataIdAccessor]);
      const childRows = isRowOpen
        ? children.map(c => ({
            ...c,
            collapsible: 'child',
            rowClass: 'CollapsibleTable-Child',
          }))
        : [];
      return [
        ...allData,
        { collapsible: 'parent', ...parentRow },
        ...childRows,
      ];
    }, []);
  }

  get composedColumns() {
    const { columns, data, dataIdAccessor } = this.props;
    const { openRows } = this.state;
    const isHeaderOpen = openRows.length;
    const HeaderIcon = isHeaderOpen ? PlusCircle : Circle;
    return [
      {
        accessor: 'collapsible',
        columnClass: classNames('CollapsibleTable-Icon', {
          'CollapsibleTable-Icon--open': isHeaderOpen,
          'CollapsibleTable-Icon--closed': !isHeaderOpen,
        }),
        onClick: rowId => {
          let newOpenRows = [];
          if (rowId && includes(openRows, rowId)) {
            newOpenRows = without(openRows, rowId);
          } else if (rowId) {
            newOpenRows = [...openRows, rowId];
          } else if (!isHeaderOpen) {
            newOpenRows = data.map(row => row[dataIdAccessor]);
          }
          this.setState({ openRows: newOpenRows });
        },
        Header: () => <HeaderIcon size={16} />,
        Cell: (collapsible, row) => {
          if (collapsible === 'parent') {
            const isCellOpen = includes(openRows, row[dataIdAccessor]);
            const CellIcon = isCellOpen ? PlusCircle : Circle;
            return <CellIcon size={16} />;
          }
          return null;
        },
      },
      ...columns,
    ];
  }

  render() {
    return (
      <Table
        {...this.props}
        data={this.filteredData}
        columns={this.composedColumns}
      />
    );
  }
}

CollapsibleTable.propTypes = {
  dataIdAccessor: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }),
  ).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
