import React from 'react';
import PropTypes from 'prop-types';
import { Zap, RefreshCw } from 'react-feather';
import Chance from 'chance';
import { intlShape, FormattedMessage } from 'react-intl';

import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';
import IconInput from 'primitives/form/icon-input';
import Checkbox from 'primitives/form/checkbox';
import Input from 'primitives/form/input';
import Label from 'primitives/form/label';
import LinkIcon from 'primitives/other/link-icon';
import Button from 'primitives/other/button';

import { generateSectorName } from 'utils/name-generator';

import './style.css';

const MAX_DIMENSION = 20;

export default function Configure({
  additionalPointsOfInterest,
  updateConfiguration,
  generateSector,
  isBuilder,
  hideTags,
  columns,
  rows,
  name,
  intl,
}) {
  const limitDimensions = func => e => {
    if (Number.parseInt(e.target.value, 10) > MAX_DIMENSION) {
      e.target.value = `${MAX_DIMENSION}`;
    } else if (Number.parseInt(e.target.value, 10) < 1) {
      e.target.value = '1';
    }
    func(e);
  };

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
    updateConfiguration('name', genFunc(chance));
  };

  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header type={HeaderType.header2}>
        <FormattedMessage id="misc.configure" />
      </Header>
      <SubContainer noMargin direction="column" align="flexStart">
        <Label noPadding htmlFor="name">
          <FormattedMessage id="misc.sectorName" />
        </Label>
        <IconInput
          name="name"
          data-key="name"
          icon={RefreshCw}
          value={name}
          onChange={updateInput}
          onIconClick={regenerateName(generateSectorName)}
        />
        <SubContainer noMargin>
          <SubContainer
            className="Configure-ButtonContainer"
            noMargin
            direction="column"
            align="flexStart"
          >
            <Label htmlFor="rows">
              <FormattedMessage id="misc.rows" />
            </Label>
            <Input
              data-key="rows"
              onChange={limitDimensions(updateInput)}
              name="rows"
              type="number"
              value={rows || ''}
            />
          </SubContainer>
          <SubContainer
            className="Configure-ButtonContainer"
            noMargin
            direction="column"
            align="flexStart"
          >
            <Label htmlFor="columns">
              <FormattedMessage id="misc.columns" />
            </Label>
            <Input
              data-key="columns"
              onChange={limitDimensions(updateInput)}
              name="columns"
              type="number"
              value={columns || ''}
            />
          </SubContainer>
        </SubContainer>
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
      </SubContainer>
      <SubContainer
        className="Configure-PaddedButtons"
        wrap
        justify="center"
        align="center"
      >
        <Button onClick={generateSector}>
          <LinkIcon icon={Zap} size="20" />
          <FormattedMessage id="misc.generate" />
        </Button>
      </SubContainer>
    </ContentContainer>
  );
}

Configure.propTypes = {
  additionalPointsOfInterest: PropTypes.bool.isRequired,
  updateConfiguration: PropTypes.func.isRequired,
  generateSector: PropTypes.func.isRequired,
  isBuilder: PropTypes.bool.isRequired,
  hideTags: PropTypes.bool.isRequired,
  columns: PropTypes.number,
  rows: PropTypes.number,
  name: PropTypes.string,
  intl: intlShape.isRequired,
};

Configure.defaultProps = {
  columns: undefined,
  rows: undefined,
  name: '',
};
