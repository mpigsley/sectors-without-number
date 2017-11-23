import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'pluralize';
import { map, size } from 'lodash';
import { Plus } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import SectionHeader from 'primitives/text/section-header';
import Button from 'primitives/other/button';
import LinkIcon from 'primitives/other/link-icon';

import { stringSortByKey, coordinateKey } from 'utils/common';
import Entities from 'constants/entities';

import EntityLinkRow from '../entity-link-row';
import './style.css';

export default function EntityList({
  currentSector,
  entities,
  entityType,
  isCloudSave,
  onClickAdd,
}) {
  if (!size(entities)) {
    return null;
  }

  const renderEntityHeader = () => {
    if (isCloudSave || !onClickAdd) {
      return (
        <SectionHeader>{Pluralize(Entities[entityType].name)}</SectionHeader>
      );
    }
    return (
      <SectionHeader>
        <FlexContainer justify="spaceBetween" align="flexEnd">
          {Pluralize(Entities[entityType].name)}
          <Button minimal className="EntityList-AddButton" onClick={onClickAdd}>
            <LinkIcon size={15} icon={Plus} />
            Add {Entities[entityType].name}
          </Button>
        </FlexContainer>
      </SectionHeader>
    );
  };

  return (
    <FlexContainer direction="column">
      {renderEntityHeader(entityType)}
      {map(entities, (entity, key) => ({
        ...entity,
        entityId: key,
        additional: Entities[entityType].topLevel
          ? coordinateKey(entity.x, entity.y)
          : undefined,
        sort: Entities[entityType].topLevel
          ? coordinateKey(entity.x, entity.y)
          : entity.name,
      }))
        .sort(stringSortByKey('sort'))
        .map(entity => (
          <EntityLinkRow
            key={entity.entityId}
            to={`/sector/${currentSector}/${entityType}/${entity.entityId}`}
          >
            <Header type={HeaderType.header4} className="EntityList-Name">
              {entity.name}
            </Header>
            {entity.additional && (
              <div className="EntityList-Additional">({entity.additional})</div>
            )}
          </EntityLinkRow>
        ))}
    </FlexContainer>
  );
}

EntityList.propTypes = {
  currentSector: PropTypes.string.isRequired,
  entities: PropTypes.shape().isRequired,
  entityType: PropTypes.string,
  isCloudSave: PropTypes.bool.isRequired,
  onClickAdd: PropTypes.func,
};

EntityList.defaultProps = {
  entityType: undefined,
  onClickAdd: undefined,
};
