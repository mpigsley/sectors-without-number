import React from 'react';
import PropTypes from 'prop-types';

import { stringSortByKey } from 'utils/common';
import { FlexContainer } from 'primitives';
import {
  InfoContainer,
  NameHeader,
  SectorNameContainer,
  Name,
  Key,
  RightArrow,
  SystemContainer,
} from './components';

export default function SectorInfo({ name, systems }) {
  return (
    <InfoContainer direction="column">
      <NameHeader>{name}</NameHeader>
      <FlexContainer direction="column" scroll>
        {systems
          .sort(stringSortByKey('key'))
          .map(system => (
            <SystemContainer key={system.key} to={`/sector/${system.key}`}>
              <FlexContainer>
                <SectorNameContainer align="baseline">
                  <Name>{system.name}</Name>
                  <Key>({system.key})</Key>
                </SectorNameContainer>
                <RightArrow />
              </FlexContainer>
            </SystemContainer>
          ))}
      </FlexContainer>
    </InfoContainer>
  );
}

SectorInfo.propTypes = {
  name: PropTypes.string.isRequired,
  systems: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
