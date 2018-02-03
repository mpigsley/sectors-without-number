import React from 'react';
import PropTypes from 'prop-types';
import { EyeOff } from 'react-feather';

import LinkRow from 'primitives/other/link-row';

export default function EntityLinkRow({ entity, entityType, currentSector }) {
  return (
    <LinkRow
      to={`/sector/${currentSector}/${entityType}/${entity.entityId}`}
      title={entity.name}
      additional={entity.additional}
      additionalIcon={entity.isHidden ? EyeOff : null}
    />
  );
}

EntityLinkRow.propTypes = {
  entity: PropTypes.shape({
    entityId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    additional: PropTypes.string,
    isHidden: PropTypes.bool,
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  currentSector: PropTypes.string.isRequired,
};
