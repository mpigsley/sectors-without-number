import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.scss';

export default function HomeSaved({ name, sector, rows, columns, created }) {
  let date = new Date(created);
  if (!created) {
    date = undefined;
  } else if (created.toDate) {
    date = created.toDate();
  }
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
          <b>
            <FormattedMessage id="misc.size" />:
          </b>{' '}
          {columns}, {rows}
        </p>
        <p className="HomeSaved-Supporting">
          <b>
            <FormattedMessage id="misc.created" />:
          </b>{' '}
          {dayjs(date).format('MMMM D, YYYY')}
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
