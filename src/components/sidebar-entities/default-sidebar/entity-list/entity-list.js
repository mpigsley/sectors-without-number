import React from 'react';
import PropTypes from 'prop-types';
import { map, size, isNumber } from 'lodash';
import { Plus, EyeOff } from 'react-feather';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';

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
  intl,
  isShared,
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
            <FormattedMessage id={Entities[entityType].name} />
            <span className="EntityList-Size">
              {numEntities}{' '}
              <FormattedMessage id={Entities[entityType].shortName} />
            </span>
          </FlexContainer>
        </SectionHeader>
      );
    }
    return (
      <SectionHeader isOpen={isOpen} onIconClick={toggleListOpen}>
        <FlexContainer justify="spaceBetween" align="flexEnd">
          <span className="EntityList-Name">
            <FormattedMessage id={Entities[entityType].name} />
          </span>
          <Button
            minimal
            className="EntityList-AddButton"
            onClick={createChildInEdit}
          >
            <LinkIcon size={15} icon={Plus} />
            <FormattedMessage
              id="misc.addEntity"
              values={{
                entity: intl.formatMessage({
                  id: Entities[entityType].shortName,
                }),
              }}
            />
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
          .map(tag => intl.formatMessage({ id: `tags.${tag}` }))
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
};

EntityList.defaultProps = {
  entityType: undefined,
  editableEntities: undefined,
};

export default EntityList;
