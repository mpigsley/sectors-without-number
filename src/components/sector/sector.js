import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { isEmpty } from 'lodash';

import Sidebar from 'components/sidebar';
import Loading from './loading';
import Error from './error';

export default function Sector({
  isInitialized,
  sector,
  generateSector,
  match,
}) {
  if (!isInitialized) {
    return <Loading />;
  } else if (isEmpty(sector)) {
    return <Error generateSector={generateSector} />;
  }
  return (
    <Fragment>
      <Route
        path={`${match.url}/:sector?/:entityType?/:entity?`}
        component={Sidebar}
      />
    </Fragment>
  );
}

Sector.propTypes = {
  isInitialized: PropTypes.bool.isRequired,
  sector: PropTypes.shape({
    rows: PropTypes.number,
    columns: PropTypes.number,
  }),
  generateSector: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

Sector.defaultProps = {
  sector: {},
};
