import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { EyeOff } from 'react-feather';
import ReactHintFactory from 'react-hint';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import LinkIcon from 'primitives/other/link-icon';
import Dice from 'primitives/icons/dice';

import { sortByKey, coordinateKey, toCommaArray } from 'utils/common';
import { map, size, isNumber } from 'constants/lodash';
import Entities from 'constants/entities';

import EntityLinkRow from '../entity-link-row';
import EntityEditRow from '../entity-edit-row';

import './style.scss';

const ReactHint = ReactHintFactory(React);

const EntityList = ({
  entities,
  entityType,
  isSidebarEditActive,
  editableEntities,
  createChildInEdit,
  isOpen,
  toggleListOpen,
  intl,
  isShared,
  customTags,
}) => {
  const numEntities = size(entities);
  if (!numEntities && !isSidebarEditActive) {
    return null;
  }

  const renderEntityHeader = () => {
    if (!isSidebarEditActive) {
      return (
        <SectionHeader
          isOpen={isOpen}
          onClick={toggleListOpen}
          header={Entities[entityType].name}
          additional={`${numEntities} ${intl.formatMessage({
            id: Entities[entityType].shortName,
          })}`}
        />
      );
    }
    return (
      <SectionHeader
        header={Entities[entityType].name}
        isOpen={isOpen}
        onIconClick={toggleListOpen}
        onAdd={createChildInEdit}
        addItemName={Entities[entityType].shortName}
      />
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
          data-rh={intl.formatMessage(
            { id: 'misc.selectGenerateData' },
            {
              entity: intl.formatMessage({
                id: Entities[entityType].shortName,
              }),
            },
          )}
          size={22}
        />
        <LinkIcon
          data-rh={intl.formatMessage({ id: 'misc.selectHidden' })}
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
      let additional;
      if (Entities[entityType].topLevel) {
        additional = coordinateKey(entity.x, entity.y);
      } else if (!isShared) {
        additional = ((entity.attributes || {}).tags || [])
          .map(tag =>
            intl.formatMessage({
              id: `tags.${tag}`,
              defaultMessage: (customTags[tag] || {}).name,
            }),
          )
          .map(toCommaArray)
          .join('');
      }
      return {
        ...entity,
        sort,
        entityId: key,
        additional,
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
  intl: intlShape.isRequired,
  isShared: PropTypes.bool.isRequired,
  customTags: PropTypes.shape().isRequired,
};

EntityList.defaultProps = {
  entityType: undefined,
  editableEntities: undefined,
};

export default EntityList;
