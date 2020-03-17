import React from 'react';
import Chance from 'chance';
import PropTypes from 'prop-types';
import { Zap, RefreshCw } from 'react-feather';
import { intlShape, FormattedMessage } from 'react-intl';

import StarBackground from 'components/star-background';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';
import Checkbox from 'primitives/form/checkbox';
import LinkIcon from 'primitives/other/link-icon';
import Button from 'primitives/other/button';
import ItemRow from 'primitives/other/item-row';
import LabeledInput from 'primitives/form/labeled-input';

import { MIN_DIMENSION, MAX_DIMENSION } from 'constants/defaults';
import { generateSectorName } from 'utils/name-generator';

import './style.scss';

export default function Configure({
  additionalPointsOfInterest,
  updateConfiguration,
  openCustomTagModal,
  generateSector,
  hideOccAndSit,
  useCustomTags,
  isLoggedIn,
  sectorName,
  isBuilder,
  hideTags,
  columns,
  rows,
  intl,
}) {
  const updateInput = ({ target }) => {
    const key = target.getAttribute('data-key');
    let { value } = target;
    if (target.type === 'number') {
      value = value ? Number.parseInt(value, 10) : undefined;
    } else if (target.type === 'checkbox') {
      value = target.checked;
    }
    updateConfiguration(key, value);
  };

  const regenerateName = genFunc => () => {
    const chance = new Chance();
    updateConfiguration('sectorName', genFunc(chance));
  };

  const isValid = () =>
    !!sectorName &&
    !!rows &&
    !!columns &&
    rows <= MAX_DIMENSION &&
    rows >= MIN_DIMENSION &&
    columns <= MAX_DIMENSION &&
    columns >= MIN_DIMENSION;

  return (
    <StarBackground>
      <ContentContainer direction="column" align="center" justify="center">
        <Header type={HeaderType.header2}>
          <FormattedMessage id="misc.configure" />
        </Header>
        <SubContainer noMargin direction="column" align="flexStart">
          <LabeledInput
            isVertical
            label="misc.sectorName"
            name="name"
            data-key="sectorName"
            icon={RefreshCw}
            value={sectorName}
            onChange={updateInput}
            onIconClick={regenerateName(generateSectorName)}
          />
          <ItemRow>
            <LabeledInput
              isVertical
              label="misc.rows"
              data-key="rows"
              onChange={updateInput}
              name="rows"
              type="number"
              value={rows || ''}
            />
            <LabeledInput
              isVertical
              label="misc.columns"
              data-key="columns"
              onChange={updateInput}
              name="columns"
              type="number"
              value={columns || ''}
            />
          </ItemRow>
          <p className="Configure-Info">
            <FormattedMessage
              id="misc.dimensionBounds"
              values={{ minNumber: MIN_DIMENSION, maxNumber: MAX_DIMENSION }}
            />
          </p>
          {isLoggedIn && (
            <FlexContainer
              align="flexEnd"
              justify="spaceBetween"
              className="Configure-ManageContainer"
            >
              <Checkbox
                data-key="useCustomTags"
                value={useCustomTags}
                onChange={updateInput}
                label={intl.formatMessage({ id: 'misc.useCustomTags' })}
              />
              <Button
                minimal
                className="Configure-ManageLink"
                onClick={openCustomTagModal}
              >
                (<FormattedMessage id="misc.manage" />)
              </Button>
            </FlexContainer>
          )}
          <Checkbox
            data-key="isBuilder"
            value={isBuilder}
            onChange={updateInput}
            label={intl.formatMessage({ id: 'misc.initializeEmpty' })}
          />
          <Checkbox
            data-key="additionalPointsOfInterest"
            value={additionalPointsOfInterest}
            onChange={updateInput}
            label={intl.formatMessage({ id: 'misc.useAPOI' })}
          />
          <Checkbox
            data-key="hideTags"
            value={hideTags}
            onChange={updateInput}
            label={intl.formatMessage({ id: 'misc.hideTagsFromPlayers' })}
          />
          <Checkbox
            data-key="hideOccAndSit"
            value={hideOccAndSit}
            onChange={updateInput}
            label={intl.formatMessage({ id: 'misc.hideOccAndSit' })}
          />
        </SubContainer>
        <SubContainer
          className="Configure-PaddedButtons"
          wrap
          justify="center"
          align="center"
        >
          <Button disabled={!isValid()} onClick={generateSector}>
            <LinkIcon icon={Zap} size="20" />
            <FormattedMessage id="misc.generate" />
          </Button>
        </SubContainer>
      </ContentContainer>
    </StarBackground>
  );
}

Configure.propTypes = {
  additionalPointsOfInterest: PropTypes.bool.isRequired,
  updateConfiguration: PropTypes.func.isRequired,
  openCustomTagModal: PropTypes.func.isRequired,
  generateSector: PropTypes.func.isRequired,
  isBuilder: PropTypes.bool.isRequired,
  hideTags: PropTypes.bool.isRequired,
  hideOccAndSit: PropTypes.bool.isRequired,
  useCustomTags: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  sectorName: PropTypes.string,
  columns: PropTypes.number,
  rows: PropTypes.number,
  intl: intlShape.isRequired,
};

Configure.defaultProps = {
  columns: undefined,
  rows: undefined,
  sectorName: '',
};
