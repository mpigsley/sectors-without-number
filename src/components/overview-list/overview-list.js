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

export default function OverviewList({ children, currentSector, entities }) {
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
                  additional={`${size(entityList)}`}
                  arrowClassName="OverviewList-Arrow"
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
  children: PropTypes.node.isRequired,
  currentSector: PropTypes.string.isRequired,
  entities: PropTypes.shape().isRequired,
};
