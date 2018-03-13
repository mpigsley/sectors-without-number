import React from 'react';
import PropTypes from 'prop-types';
import { omit, map, size } from 'lodash';

import ProfileModal from 'components/profile-modal';
import Navigation from 'components/navigation';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import LinkRow from 'primitives/other/link-row';

import Entities from 'constants/entities';

import './style.css';

export default function OverviewList({
  toHome,
  children,
  currentSector,
  entities,
  isInitialized,
  params,
}) {
  if (!entities[Entities.sector.key][currentSector] && isInitialized) {
    toHome();
  }

  return (
    <FlexContainer>
      <Navigation />
      <FlexContainer flex="1">
        <FlexContainer
          direction="column"
          align="center"
          className="OverviewList"
        >
          <Header type={HeaderType.header2}>Entities</Header>
          <div className="OverviewList-List">
            {map(
              omit(entities, Entities.sector.key),
              (entityList, entityType) => (
                <LinkRow
                  key={entityType}
                  to={`/overview/${currentSector}/${entityType}`}
                  title={Entities[entityType].name}
                  additional={isInitialized ? `${size(entityList)}` : undefined}
                  arrowClassName="OverviewList-Arrow"
                  className={
                    params.entityType === entityType
                      ? 'OverviewList-Item--selected'
                      : ''
                  }
                />
              ),
            )}
          </div>
        </FlexContainer>
        {children}
      </FlexContainer>
      <ProfileModal />
    </FlexContainer>
  );
}

OverviewList.propTypes = {
  toHome: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  currentSector: PropTypes.string.isRequired,
  entities: PropTypes.shape().isRequired,
  isInitialized: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    entityType: PropTypes.string,
  }).isRequired,
};
