import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import LabeledItem from 'primitives/other/labeled-item';
import BasicLink from 'primitives/other/basic-link';

import { RotateCcw } from 'constants/icons';

import './style.scss';

const titledItem = (key, description, title) => {
  let titleElement;
  if (title) {
    titleElement = <span className="FactionAttributes-Title">{title}: </span>;
  }
  return (
    <span key={key}>
      {titleElement}
      {description}
    </span>
  );
};

const attributeItem = (label, value, superscript) => (
  <LabeledItem isVertical label={label} className="FactionAttributes-Attribute">
    <FlexContainer flex="1" justify="center">
      <span className="FactionAttributes-Value">{value || 0}</span>
      <span className="FactionAttributes-Superscript">{superscript}</span>
    </FlexContainer>
  </LabeledItem>
);

export default function FactionAttributes({ faction, attributes, className }) {
  let homeworldElement;
  if ((attributes.homeworld || {}).link) {
    homeworldElement = (
      <LabeledItem label="misc.homeworld">
        <BasicLink to={attributes.homeworld.link}>
          {attributes.homeworld.name}
        </BasicLink>
      </LabeledItem>
    );
  }

  let relationship;
  if (faction.relationship) {
    relationship = (
      <LabeledItem label="misc.relationship">
        <FormattedMessage id={`faction.relationship.${faction.relationship}`} />
      </LabeledItem>
    );
  }

  let goal;
  if (faction.goal) {
    goal = (
      <LabeledItem isVertical label="misc.goal">
        {titledItem(
          faction.goal,
          <FormattedMessage id={`faction.goal.${faction.goal}.description`} />,
          <FormattedMessage id={`faction.goal.${faction.goal}`} />,
        )}
      </LabeledItem>
    );
  }

  let description;
  if (faction.description) {
    description = (
      <LabeledItem isVertical label="misc.description">
        {titledItem('description', faction.description)}
      </LabeledItem>
    );
  }

  let tags;
  if ((faction.tags || []).length) {
    tags = (
      <LabeledItem isVertical label="misc.tags">
        <FlexContainer direction="column">
          {faction.tags.map(tag =>
            titledItem(
              tag,
              <>
                <FormattedMessage id={`faction.tags.${tag}.description`} />
                <FlexContainer className="FactionAttributes-TagEffect">
                  <span className="FactionAttributes-Effect">
                    <FormattedMessage id="misc.effect" />
                  </span>
                  <FormattedMessage id={`faction.tags.${tag}.effect`} />
                </FlexContainer>
              </>,
              <FormattedMessage id={`faction.tags.${tag}`} />,
            ),
          )}
        </FlexContainer>
      </LabeledItem>
    );
  }

  return (
    <FlexContainer direction="column" className={className}>
      <FlexContainer className="FactionAttributes-AttributeContainer">
        {attributeItem(
          'faction.category.force',
          faction.force,
          attributes.owned.force,
        )}
        {attributeItem(
          'faction.category.cunning',
          faction.cunning,
          attributes.owned.cunning,
        )}
        {attributeItem(
          'faction.category.wealth',
          faction.wealth,
          attributes.owned.wealth,
        )}
      </FlexContainer>
      <FlexContainer className="FactionAttributes-AttributeContainer">
        {attributeItem(
          'misc.hitPoints',
          faction.hitPoints,
          attributes.hitPoints,
        )}
        {attributeItem(
          'misc.balance',
          faction.balance,
          <span>
            <RotateCcw size={14} />
            {attributes.income}
          </span>,
        )}
        {attributeItem('misc.experience', faction.experience)}
      </FlexContainer>
      {homeworldElement}
      {relationship}
      {goal}
      {description}
      {tags}
    </FlexContainer>
  );
}

FactionAttributes.propTypes = {
  className: PropTypes.string,
  attributes: PropTypes.shape({
    hitPoints: PropTypes.number,
    income: PropTypes.number,
    homeworld: PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string,
    }),
    owned: PropTypes.shape({
      force: PropTypes.number,
      cunning: PropTypes.number,
      wealth: PropTypes.number,
    }),
  }).isRequired,
  faction: PropTypes.shape({
    goal: PropTypes.string,
    description: PropTypes.string,
    relationship: PropTypes.string,
    stealthed: PropTypes.bool,
  }).isRequired,
};

FactionAttributes.defaultProps = {
  className: undefined,
  homeworld: undefined,
};
