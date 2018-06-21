import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import ActionLayout from 'components/sidebar-actions/action-layout';
import Entities from 'constants/entities';

export default function DefaultActions({ intl, entityType, children }) {
  return (
    <ActionLayout name={intl.formatMessage({ id: Entities[entityType].name })}>
      {children}
    </ActionLayout>
  );
}

DefaultActions.propTypes = {
  intl: intlShape.isRequired,
  entityType: PropTypes.string,
  children: PropTypes.node.isRequired,
};

DefaultActions.defaultProps = {
  entityType: undefined,
};
