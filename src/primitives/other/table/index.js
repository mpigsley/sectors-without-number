import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from 'react-intl';

import { isNil } from 'constants/lodash';
import { ChevronDown, ChevronUp } from 'constants/icons';

import './style.css';

const nextDirection = direction => {
  if (direction === 1) {
    return -1;
  }
  if (direction === -1) {
    return 0;
  }
  return 1;
};

class Table extends Component {
  static propTypes = {
    className: PropTypes.string,
    dataIdAccessor: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        onClick: PropTypes.func,
        rowClass: PropTypes.string,
      }),
    ).isRequired,
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
        translateItems: PropTypes.bool,
      }),
    ).isRequired,
    intl: intlShape.isRequired,
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

  static getDerivedStateFromProps() {
    return { sort: undefined, sortDirection: 0 };
  }

  onHeaderClick = (accessor, onClick) => () => {
    if (onClick) {
      return onClick();
    }
    const { sortable } = this.props;
    if (!sortable) {
      return null;
    }
    const { sortDirection, sort } = this.state;
    let newSortDirection = nextDirection(sortDirection);
    if (accessor !== sort) {
      newSortDirection = 1;
    }
    return this.setState({
      sort: !newSortDirection ? undefined : accessor,
      sortDirection: newSortDirection,
    });
  };

  get sortedData() {
    const { sortable, data } = this.props;
    const { sortDirection, sort } = this.state;
    if (!sortable || !sortDirection) {
      return data;
    }
    return [...data].sort((a, b) => {
      if (a[sort] > b[sort]) {
        return sortDirection;
      }
      if (a[sort] < b[sort]) {
        return -sortDirection;
      }
      return 0;
    });
  }

  renderSortIcon(accessor) {
    const { sortable } = this.props;
    const { sort, sortDirection } = this.state;
    if (!sortable || sort !== accessor || !sortDirection) {
      return null;
    }
    if (sortDirection < 0) {
      return <ChevronUp size={12} className="Table-SortIcon" />;
    }
    return <ChevronDown size={12} className="Table-SortIcon" />;
  }

  renderRowItem(row, { Cell, accessor, translateItem }) {
    let item = row[accessor];
    const { intl } = this.props;
    if (item && translateItem && intl.messages[row[accessor]]) {
      item = intl.formatMessage({ id: row[accessor] });
    }
    item = isNil(item) ? '-' : item;
    return Cell ? Cell(item, row) : item;
  }

  render() {
    const {
      className,
      columns,
      light,
      condensed,
      sortable,
      intl,
      dataIdAccessor,
    } = this.props;
    return (
      <table className={classNames('Table', className)}>
        <thead>
          <tr>
            {columns.map(
              ({ Header, accessor, columnClass, centered, onClick }) => (
                <th
                  onClick={this.onHeaderClick(accessor, onClick)}
                  className={classNames('Table-Header', columnClass, {
                    'Table-Header--light': light,
                    'Table-Header--condensed': condensed,
                    'Table-Header--sortable': sortable,
                    'Table--centered': centered,
                  })}
                  key={accessor}
                >
                  {typeof Header === 'string' ? (
                    intl.formatMessage({ id: Header })
                  ) : (
                    <Header />
                  )}
                  {this.renderSortIcon(accessor)}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {this.sortedData.map(({ rowClass, onClick, ...row }) => (
            <tr
              className={classNames('Table-Row', rowClass)}
              key={row[dataIdAccessor]}
            >
              {columns.map(column => (
                <td
                  onClick={() =>
                    column.onClick
                      ? column.onClick(row[dataIdAccessor])
                      : () => {}
                  }
                  className={classNames('Table-Element', column.columnClass, {
                    'Table-Element--light': light,
                    'Table-Header--condensed': condensed,
                    'Table--centered': column.centered,
                  })}
                  key={column.accessor}
                >
                  {this.renderRowItem(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default injectIntl(Table);
