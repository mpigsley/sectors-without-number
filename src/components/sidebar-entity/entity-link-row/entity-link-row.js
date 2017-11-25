import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ChevronRight } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

export default function EntityLinkRow({ entity, entityType, currentSector }) {
  return (
    <Link
      className="EntityLinkRow"
      to={`/sector/${currentSector}/${entityType}/${entity.entityId}`}
    >
      <FlexContainer justify="spaceBetween" flex="1">
        <FlexContainer flex="1" align="baseline">
          <Header type={HeaderType.header4} className="EntityLinkRow-Name">
            {entity.name}
          </Header>
          {entity.additional && (
            <div className="EntityLinkRow-Additional">
              ({entity.additional})
            </div>
          )}
        </FlexContainer>
        <ChevronRight className="EntityLinkRow-RightArrow" />
      </FlexContainer>
    </Link>
  );
}

EntityLinkRow.propTypes = {
  entity: PropTypes.shape({
    entityId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    addition: PropTypes.string,
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  currentSector: PropTypes.string.isRequired,
};
