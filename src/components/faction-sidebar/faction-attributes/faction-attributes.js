import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import LabeledItem from 'primitives/other/labeled-item';
import ButtonLink from 'primitives/other/button-link';

import './style.css';

const titledItem = (description, title) => {
  let titleElement;
  if (title) {
    titleElement = <span className="FactionAttributes-Title">{title}: </span>;
  }
  return (
    <span key="title">
      {titleElement}
      {description}
    </span>
  );
};

export default function FactionAttributes({ faction, homeworld, className }) {
  let homeworldElement;
  if (homeworld) {
    homeworldElement = (
      <LabeledItem label="misc.homeworld">
        <ButtonLink
          className="FactionAttributes-Link"
          minimal
          to={homeworld.link}
        >
          {homeworld.name}
        </ButtonLink>
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
        {titledItem(faction.description)}
      </LabeledItem>
    );
  }

  let tags;
  if ((faction.tags || []).length) {
    tags = (
      <LabeledItem isVertical label="misc.tags">
        {faction.tags.map(tag =>
          titledItem(
            <Fragment>
              <FormattedMessage id={`faction.tags.${tag}.description`} />
              <FlexContainer>
                <span className="FactionAttributes-Effect">
                  <FormattedMessage id="misc.effect" />
                </span>
                <FormattedMessage id={`faction.tags.${tag}.effect`} />
              </FlexContainer>
            </Fragment>,
            <FormattedMessage id={`faction.tags.${tag}`} />,
          ),
        )}
      </LabeledItem>
    );
  }

  return (
    <FlexContainer direction="column" className={className}>
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
  homeworld: PropTypes.shape({
    link: PropTypes.string,
    name: PropTypes.string,
  }),
  faction: PropTypes.shape({
    goal: PropTypes.string,
    description: PropTypes.string,
    relationship: PropTypes.string,
  }).isRequired,
};

FactionAttributes.defaultProps = {
  className: undefined,
  homeworld: undefined,
};
