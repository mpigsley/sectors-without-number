import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'pluralize';
import { map, size } from 'lodash';
import { Plus } from 'react-feather';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import Button from 'primitives/other/button';
import LinkIcon from 'primitives/other/link-icon';

import { stringSortByKey, coordinateKey } from 'utils/common';
import Entities from 'constants/entities';

import EntityLinkRow from '../entity-link-row';
import EntityEditRow from '../entity-edit-row';
import './style.css';

export default function EntityList({
  entities,
  entityType,
  isSidebarEditActive,
  editableEntities,
}) {
  if (!size(entities)) {
    return null;
  }

  const renderEntityHeader = () => {
    if (!isSidebarEditActive) {
      return (
        <SectionHeader>{Pluralize(Entities[entityType].name)}</SectionHeader>
      );
    }
    return (
      <SectionHeader>
        <FlexContainer justify="spaceBetween" align="flexEnd">
          {Pluralize(Entities[entityType].name)}
          <Button minimal className="EntityList-AddButton">
            <LinkIcon size={15} icon={Plus} />
            Add {Entities[entityType].name}
          </Button>
        </FlexContainer>
      </SectionHeader>
    );
  };

  const renderEntity = entity => {
    if (!isSidebarEditActive) {
      return (
        <EntityLinkRow
          key={entity.entityId}
          entity={entity}
          entityType={entityType}
        />
      );
    }
    return <EntityEditRow key={entity.entityId} entity={entity} />;
  };

  const rowEntities = !isSidebarEditActive ? entities : editableEntities;
  return (
    <div>
      {renderEntityHeader(entityType)}
      {map(rowEntities, (entity, key) => ({
        ...entity,
        entityId: key || entity.savedId || entity.tempId,
        additional: Entities[entityType].topLevel
          ? coordinateKey(entity.x, entity.y)
          : undefined,
        sort: Entities[entityType].topLevel
          ? coordinateKey(entity.x, entity.y)
          : entity.name,
      }))
        .sort(stringSortByKey('sort'))
        .map(renderEntity)}
    </div>
  );
}

EntityList.propTypes = {
  entities: PropTypes.shape().isRequired,
  entityType: PropTypes.string,
  isSidebarEditActive: PropTypes.bool.isRequired,
  editableEntities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      savedId: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ),
};

EntityList.defaultProps = {
  entityType: undefined,
  editableEntities: undefined,
};
