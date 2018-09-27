import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import LabeledItem from 'primitives/other/labeled-item';
import ButtonLink from 'primitives/other/button-link';

import { RotateCcw } from 'constants/icons';

import './style.scss';

// eslint-disable-next-line react/prop-types
const renderRoll = ({ dice, add, other }) => (
  <FormattedMessage
    id="misc.damage"
    values={{
      num: `${dice}${add ? `+${add}` : ''}${other ? ` ${other}` : ''}`,
    }}
  />
);

export default function FactionAssets({ assets, className }) {
  const renderAsset = asset => {
    const {
      id,
      key,
      category,
      rating,
      type,
      hitPoints,
      cost,
      techLevel,
      notes,
      attack,
      counter,
      location,
      upkeep,
      stealthed,
    } = asset;

    let attackRow = <FormattedMessage id="misc.none" />;
    if (attack) {
      attackRow = (
        <span>
          <FormattedMessage id={`faction.category.${attack.attack}`} />
          {' v '}
          <FormattedMessage id={`faction.category.${attack.defense}`} />
          {', '}
          {renderRoll(attack.damage)}
        </span>
      );
    }

    let counterRow = <FormattedMessage id="misc.none" />;
    if (counter) {
      counterRow = renderRoll(counter);
    }

    let upkeepRow;
    if (upkeep) {
      upkeepRow = (
        <LabeledItem className="FactionAssets-Item" label="misc.upkeep">
          <FlexContainer align="center">
            <RotateCcw size={14} className="FactionAssets-Icon" />
            {upkeep}
          </FlexContainer>
        </LabeledItem>
      );
    }

    let noteRow;
    if ((notes || []).length) {
      noteRow = (
        <LabeledItem className="FactionAssets-Item" label="entity.notes">
          <span>
            {(notes || []).map((note, i) => (
              <Fragment key={note}>
                <FormattedMessage id={`faction.note.${note}`} />
                {i + 1 === notes.length ? '' : ', '}
              </Fragment>
            ))}
          </span>
        </LabeledItem>
      );
    }

    return (
      <FlexContainer
        className="FactionAssets-Asset"
        key={id}
        direction="column"
      >
        <Header type={HeaderType.header4} noMargin>
          <span className="FactionAssets-Header">
            <FormattedMessage id={`faction.assets.${key}`} />
          </span>
          (<FormattedMessage id={`faction.category.${category}`} /> {rating} -{' '}
          <FormattedMessage id={`faction.type.${type}`} />)
        </Header>
        <p className="FactionAssets-Description">
          <FormattedMessage id={`faction.assets.${key}.description`} />
        </p>
        <LabeledItem className="FactionAssets-Item" label="misc.hitPoints">
          {hitPoints.current} / {hitPoints.total || '-'}
        </LabeledItem>
        <LabeledItem className="FactionAssets-Item" label="misc.stealthed">
          <FormattedMessage id={stealthed ? 'misc.yes' : 'misc.no'} />
        </LabeledItem>
        <LabeledItem className="FactionAssets-Item" label="misc.initialCost">
          {cost}
        </LabeledItem>
        <LabeledItem className="FactionAssets-Item" label="techLevel">
          {techLevel}
        </LabeledItem>
        {upkeepRow}
        {noteRow}
        <LabeledItem className="FactionAssets-Item" label="misc.attack">
          {attackRow}
        </LabeledItem>
        <LabeledItem className="FactionAssets-Item" label="misc.counter">
          {counterRow}
        </LabeledItem>
        {location.link && (
          <LabeledItem label="misc.location">
            <ButtonLink
              className="FactionAttributes-Link"
              minimal
              to={location.link}
            >
              {location.name}
            </ButtonLink>
          </LabeledItem>
        )}
      </FlexContainer>
    );
  };

  return (
    <FlexContainer direction="column" className={className}>
      {assets.map(renderAsset)}
    </FlexContainer>
  );
}

FactionAssets.propTypes = {
  className: PropTypes.string,
  assets: PropTypes.arrayOf(PropTypes.shape()),
};

FactionAssets.defaultProps = {
  className: undefined,
  assets: [],
};
