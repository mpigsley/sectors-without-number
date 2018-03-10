import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from 'react-feather';

import './style.css';

const nextDirection = direction => {
  if (direction === 1) {
    return -1;
  } else if (direction === -1) {
    return 0;
  }
  return 1;
};

export default class Table extends Component {
  static propTypes = {
    className: PropTypes.string,
    dataIdAccessor: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    light: PropTypes.bool,
    condensed: PropTypes.bool,
    sortable: PropTypes.bool,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        accessor: PropTypes.string.isRequired,
        Header: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
          .isRequired,
        Cell: PropTypes.func,
        columnClass: PropTypes.string,
        centered: PropTypes.bool,
      }),
    ).isRequired,
  };

  static defaultProps = {
    light: false,
    condensed: false,
    sortable: false,
    className: undefined,
  };

  state = {
    sort: undefined,
    sortDirection: 0,
  };

  componentWillReceiveProps() {
    this.setState({
      sort: undefined,
      sortDirection: 0,
    });
  }

  onHeaderClick = accessor => () => {
    if (!this.props.sortable) {
      return null;
    }
    let sortDirection = nextDirection(this.state.sortDirection);
    if (accessor !== this.state.sort) {
      sortDirection = 1;
    }
    return this.setState({
      sort: !sortDirection ? undefined : accessor,
      sortDirection,
    });
  };

  get sortedData() {
    if (!this.props.sortable || !this.state.sortDirection) {
      return this.props.data;
    }
    return [...this.props.data].sort((a, b) => {
      if (a[this.state.sort] > b[this.state.sort]) {
        return this.state.sortDirection;
      } else if (a[this.state.sort] < b[this.state.sort]) {
        return -this.state.sortDirection;
      }
      return 0;
    });
  }

  renderSortIcon(accessor) {
    if (
      !this.props.sortable ||
      this.state.sort !== accessor ||
      !this.state.sortDirection
    ) {
      return null;
    } else if (this.state.sortDirection < 0) {
      return <ChevronUp size={12} className="Table-SortIcon" />;
    }
    return <ChevronDown size={12} className="Table-SortIcon" />;
  }

  render() {
    return (
      <table className={classNames('Table', this.props.className)}>
        <thead>
          <tr>
            {this.props.columns.map(
              ({ Header, accessor, columnClass, centered }) => (
                <th
                  onClick={this.onHeaderClick(accessor)}
                  className={classNames('Table-Header', columnClass, {
                    'Table-Header--light': this.props.light,
                    'Table-Header--condensed': this.props.condensed,
                    'Table-Header--sortable': this.props.sortable,
                    'Table--centered': centered,
                  })}
                  key={accessor}
                >
                  {typeof Header === 'string' ? Header : <Header />}
                  {this.renderSortIcon(accessor)}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {this.sortedData.map(row => (
            <tr className="Table-Row" key={row[this.props.dataIdAccessor]}>
              {this.props.columns.map(
                ({ accessor, Cell, columnClass, centered }) => (
                  <td
                    className={classNames('Table-Element', columnClass, {
                      'Table-Element--light': this.props.light,
                      'Table-Header--condensed': this.props.condensed,
                      'Table--centered': centered,
                    })}
                    key={accessor}
                  >
                    {Cell ? Cell(row[accessor], row) : row[accessor]}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
