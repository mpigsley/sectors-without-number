import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'primitives/other/table';

import { includes } from 'constants/lodash';

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
      return [...allData, parentRow, ...(isRowOpen ? children : [])];
    }, []);
  }

  render() {
    return <Table {...this.props} data={this.filteredData} />;
  }
}
