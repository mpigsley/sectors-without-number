import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Table from 'primitives/other/table';

import { without, includes } from 'constants/lodash';
import { PlusCircle, Circle } from 'constants/icons';

import './style.css';

export default class CollapsibleTable extends Component {
  static propTypes = {
    dataIdAccessor: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
      }),
    ).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  state = {
    openRows: this.props.data.map(row => row[this.props.dataIdAccessor]),
  };

  get filteredData() {
    const { data, dataIdAccessor } = this.props;
    const { openRows } = this.state;
    return data.reduce((allData, { children, ...parentRow }) => {
      const isRowOpen = includes(openRows, parentRow[dataIdAccessor]);
      const childRows = isRowOpen
        ? children.map(c => ({ ...c, className: 'CollapsibleTable-Child' }))
        : [];
      return [...allData, parentRow, ...childRows];
    }, []);
  }

  get composedColumns() {
    const { columns, data, dataIdAccessor } = this.props;
    const { openRows } = this.state;
    const isHeaderOpen = !openRows.length;
    const Icon = isHeaderOpen ? PlusCircle : Circle;
    return [
      {
        accessor: 'collapsible',
        columnClass: classNames('CollapsibleTable-Icon', {
          'CollapsibleTable-Icon--open': isHeaderOpen,
          'CollapsibleTable-Icon--closed': !isHeaderOpen,
        }),
        onClick: rowId => {
          let newOpenRows = [];
          if (rowId && includes(openRows)) {
            newOpenRows = without(openRows, rowId);
          } else if (rowId) {
            newOpenRows = [...openRows, rowId];
          } else if (isHeaderOpen) {
            newOpenRows = data.map(row => row[dataIdAccessor]);
          }
          this.setState({ openRows: newOpenRows });
        },
        Header: () => <Icon size={16} />,
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
