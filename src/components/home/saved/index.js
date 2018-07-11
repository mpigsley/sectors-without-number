import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

export default function HomeSaved({ name, sector, rows, columns, created }) {
  return (
    <FlexContainer
      direction="column"
      justify="spaceBetween"
      className="HomeSaved"
    >
      <Link to={`/sector/${sector}`} className="HomeSaved-Link">
        <Header noMargin type={HeaderType.header3} className="HomeSaved-Title">
          {name}
        </Header>
        <p className="HomeSaved-Supporting">
          <b>Size:</b> {columns}, {rows}
        </p>
        <p className="HomeSaved-Supporting">
          <b>Created:</b>{' '}
          {dayjs(created ? created.toDate() : undefined).format('MMMM D, YYYY')}
        </p>
      </Link>
    </FlexContainer>
  );
}

HomeSaved.propTypes = {
  name: PropTypes.string.isRequired,
  sector: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  created: PropTypes.shape(),
};

HomeSaved.defaultProps = {
  created: null,
};
