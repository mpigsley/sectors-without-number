import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export default function Table({
  className,
  dataIdAccessor,
  data,
  light,
  condensed,
  columns,
}) {
  return (
    <table className={classNames('Table', className)}>
      <thead>
        <tr>
          {columns.map(({ Header, accessor, columnClass, centered }) => (
            <th
              className={classNames('Table-Header', columnClass, {
                'Table-Header--light': light,
                'Table-Header--condensed': condensed,
                'Table--centered': centered,
              })}
              key={accessor}
            >
              {typeof Header === 'string' ? Header : <Header />}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr className="Table-Row" key={row[dataIdAccessor]}>
            {columns.map(({ accessor, Cell, columnClass, centered }) => (
              <td
                className={classNames('Table-Element', columnClass, {
                  'Table-Element--light': light,
                  'Table-Header--condensed': condensed,
                  'Table--centered': centered,
                })}
                key={accessor}
              >
                {Cell ? Cell(row[accessor]) : row[accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  className: PropTypes.string,
  dataIdAccessor: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  light: PropTypes.bool,
  condensed: PropTypes.bool,
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

Table.defaultProps = {
  light: false,
  className: undefined,
};
