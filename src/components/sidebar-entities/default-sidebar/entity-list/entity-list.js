import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'pluralize';
import { map, size, isNumber } from 'lodash';
import { Plus, EyeOff } from 'react-feather';
import ReactHintFactory from 'react-hint';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import Button from 'primitives/other/button';
import LinkIcon from 'primitives/other/link-icon';
import Dice from 'primitives/icons/dice';

import { sortByKey, coordinateKey, toCommaArray } from 'utils/common';
import Entities from 'constants/entities';

import EntityLinkRow from '../entity-link-row';
import EntityEditRow from '../entity-edit-row';

import './style.css';

const ReactHint = ReactHintFactory(React);

const EntityList = ({
  entities,
  entityType,
  isSidebarEditActive,
  editableEntities,
  createChildInEdit,
  isOpen,
  toggleListOpen,
}) => {
  const numEntities = size(entities);
  if (!numEntities && !isSidebarEditActive) {
    return null;
  }

  const renderEntityHeader = () => {
    if (!isSidebarEditActive) {
      return (
        <SectionHeader
          className="EntityList-Name"
          isOpen={isOpen}
          onClick={toggleListOpen}
        >
          <FlexContainer justify="spaceBetween" align="flexEnd">
            <span>{Pluralize(Entities[entityType].name)}</span>
            <span className="EntityList-Size">
              {`${numEntities} ${
                numEntities > 1
                  ? Pluralize(Entities[entityType].shortName)
                  : Entities[entityType].shortName
              }`}
            </span>
          </FlexContainer>
        </SectionHeader>
      );
    }
    return (
      <SectionHeader isOpen={isOpen} onIconClick={toggleListOpen}>
        <FlexContainer justify="spaceBetween" align="flexEnd">
          <span className="EntityList-Name">
            {Pluralize(Entities[entityType].name)}
          </span>
          <Button
            minimal
            className="EntityList-AddButton"
            onClick={createChildInEdit}
          >
            <LinkIcon size={15} icon={Plus} />
            Add {Entities[entityType].shortName}
          </Button>
        </FlexContainer>
      </SectionHeader>
    );
  };

  const renderEntitySubHeader = rowEntities => {
    if (!isSidebarEditActive || !size(rowEntities) || !isOpen) {
      return null;
    }
    return (
      <FlexContainer
        justify="flexEnd"
        align="center"
        className="EntityList-SubHeader"
      >
        <Dice
          data-rh={`Select to generate ${(
            Entities[entityType].shortName || ''
          ).toLowerCase()} data.`}
          size={22}
        />
        <LinkIcon
          data-rh="Select to keep hidden from your players."
          className="EntityList-SubHeaderHidden"
          icon={EyeOff}
          size={18}
        />
      </FlexContainer>
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
    return (
      <EntityEditRow
        key={entity.entityId}
        entity={entity}
        entityType={entityType}
      />
    );
  };

  const renderEntities = rowEntities => {
    if (!isOpen) {
      return null;
    }
    return map(rowEntities, (entity, key) => {
      let sort = -entity.sort;
      if (!isNumber(entity.sort)) {
        sort = Entities[entityType].topLevel
          ? coordinateKey(entity.x, entity.y)
          : entity.name;
      }
      return {
        ...entity,
        sort,
        entityId: key,
        additional: Entities[entityType].topLevel
          ? coordinateKey(entity.x, entity.y)
          : ((entity.attributes || {}).tags || [])
              .map(tag => Entities[entityType].tags[tag].name)
              .map(toCommaArray)
              .join(''),
      };
    })
      .sort(sortByKey('sort'))
      .map(renderEntity);
  };

  const rowEntities = !isSidebarEditActive ? entities : editableEntities;
  return (
    <div>
      {renderEntityHeader(entityType)}
      {renderEntitySubHeader(rowEntities)}
      {renderEntities(rowEntities)}
      <ReactHint events position="left" />
    </div>
  );
};

EntityList.propTypes = {
  entities: PropTypes.shape().isRequired,
  entityType: PropTypes.string,
  isSidebarEditActive: PropTypes.bool.isRequired,
  editableEntities: PropTypes.shape(),
  createChildInEdit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleListOpen: PropTypes.func.isRequired,
};

EntityList.defaultProps = {
  entityType: undefined,
  editableEntities: undefined,
};

export default EntityList;
