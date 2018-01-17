import React from 'react';
import PropTypes from 'prop-types';
import { X, Plus } from 'react-feather';
import { filter, includes, map, pull } from 'lodash';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import Header, { HeaderType } from 'primitives/text/header';
import Dropdown from 'primitives/form/dropdown';
import Button from 'primitives/other/button';
import LinkIcon from 'primitives/other/link-icon';

import { capitalizeFirstLetter } from 'utils/common';
import Entities from 'constants/entities';

const renderList = (list, listKey) => (
  <div key={listKey} className="EntityAttributes-Content">
    <b>{capitalizeFirstLetter(listKey)}:</b>
    <ul className="EntityAttributes-ContentList">
      {list
        .map(capitalizeFirstLetter)
        .map(element => <li key={element}>{element}</li>)}
    </ul>
  </div>
);

export default function EntityTags({
  entityType,
  entity,
  isSidebarEditActive,
  updateEntityInEdit,
}) {
  if (
    !Entities[entityType].tags ||
    (!isSidebarEditActive && !(entity.attributes.tags || []).length)
  ) {
    return null;
  }

  let tags;
  const entityTags = (entity.attributes || {}).tags || [];
  if (isSidebarEditActive) {
    tags = entityTags.sort().map(tag => (
      <FlexContainer key={tag} align="center" className="EntityTag--edit">
        <X
          className="EntityTag-Action"
          size={25}
          onClick={() =>
            updateEntityInEdit({
              attributes: { tags: pull(entityTags, tag) },
            })
          }
        />
        <Dropdown
          wrapperClassName="EntityTag-Dropdown"
          value={tag}
          dropUp
          clearable={false}
          onChange={({ value }) =>
            updateEntityInEdit({
              attributes: {
                tags: pull(entityTags, tag).concat([value]),
              },
            })
          }
          options={filter(
            Entities[entityType].tags,
            ({ key }) => !includes(entity.attributes.tags, key) || key === tag,
          ).map(({ key, name }) => ({
            value: key,
            label: name,
          }))}
        />
      </FlexContainer>
    ));
  } else {
    tags = entityTags
      .map(tag => Entities[entityType].tags[tag])
      .map(({ key, name, description, ...lists }) => (
        <div key={key} className="EntityAttributes-Tag">
          <Header type={HeaderType.header4}>{name}</Header>
          <p className="EntityAttributes-Content">{description}</p>
          {map(lists, renderList)}
        </div>
      ));
  }

  let header = <SectionHeader>{Entities[entityType].name} Tags</SectionHeader>;
  if (isSidebarEditActive) {
    header = (
      <SectionHeader>
        <FlexContainer justify="spaceBetween" align="flexEnd">
          {Entities[entityType].name} Tags
          <Button
            minimal
            className="EntityTags-AddButton"
            onClick={() => {
              const attributeTags = (entity.attributes || {}).tags || [];
              if (includes(attributeTags, '')) {
                return;
              }
              updateEntityInEdit({
                attributes: {
                  tags: attributeTags.concat(['']),
                },
              });
            }}
          >
            <LinkIcon size={15} icon={Plus} />
            Add {Entities[entityType].name} Tag
          </Button>
        </FlexContainer>
      </SectionHeader>
    );
  }

  return (
    <div>
      {header}
      <div className="EntityAttributes-Section">{tags}</div>
    </div>
  );
}

EntityTags.propTypes = {
  isSidebarEditActive: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    attributes: PropTypes.shape(),
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  updateEntityInEdit: PropTypes.func.isRequired,
};
