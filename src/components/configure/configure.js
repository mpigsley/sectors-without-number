import React from 'react';
import PropTypes from 'prop-types';
import { Zap, RefreshCw } from 'react-feather';
import Chance from 'chance';

import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';
import FlexContainer from 'primitives/container/flex-container';
import IconInput from 'primitives/form/icon-input';
import Input from 'primitives/form/input';
import Label from 'primitives/form/label';
import LinkIcon from 'primitives/other/link-icon';
import ButtonLink from 'primitives/other/button-link';

import { generateSectorName } from 'utils/name-generator';

import './style.css';

export default function Configure({
  updateConfiguration,
  isBuilder,
  columns,
  rows,
  name,
}) {
  const updateInput = e => {
    const key = e.target.getAttribute('data-key');
    let value = e.target.value;
    if (e.target.type === 'number') {
      value = value ? Number.parseInt(value, 10) : null;
    } else if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }
    updateConfiguration(key, value);
  };

  const regenerateName = genFunc => () => {
    const chance = new Chance();
    updateConfiguration('name', genFunc(chance));
  };

  const invalidText =
    columns > 20 || rows > 20 ? (
      <div className="Configure-Invalid">
        Column and row count can not be greater than 20.
      </div>
    ) : null;

  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header type={HeaderType.header2}>Configure</Header>
      <SubContainer noMargin direction="column" align="flexStart">
        {invalidText}
        <Label noPadding htmlFor="name">
          Sector Name
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
            <Label htmlFor="rows">Rows</Label>
            <Input
              data-key="rows"
              onChange={updateInput}
              name="rows"
              type="number"
              value={rows}
            />
          </SubContainer>
          <SubContainer
            className="Configure-ButtonContainer"
            noMargin
            direction="column"
            align="flexStart"
          >
            <Label htmlFor="columns">Columns</Label>
            <Input
              data-key="columns"
              onChange={updateInput}
              name="columns"
              type="number"
              value={columns}
            />
          </SubContainer>
        </SubContainer>
        <FlexContainer align="center" className="Configure-Checkbox">
          <Input
            data-key="isBuilder"
            onChange={updateInput}
            name="isBuilder"
            value={isBuilder}
            type="checkbox"
          />
          <Label noPadding htmlFor="isBuilder">
            Initialize Empty Sector
          </Label>
        </FlexContainer>
      </SubContainer>
      <SubContainer
        className="Configure-PaddedButtons"
        wrap
        justify="center"
        align="center"
      >
        <ButtonLink to={`/sector/${new Chance().hash({ length: 20 })}`}>
          <LinkIcon icon={Zap} size="20" />
          Generate
        </ButtonLink>
      </SubContainer>
    </ContentContainer>
  );
}

Configure.propTypes = {
  updateConfiguration: PropTypes.func.isRequired,
  isBuilder: PropTypes.bool.isRequired,
  columns: PropTypes.number,
  rows: PropTypes.number,
  name: PropTypes.string,
};

Configure.defaultProps = {
  columns: '',
  rows: '',
  name: '',
};
