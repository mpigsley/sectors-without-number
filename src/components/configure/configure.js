import React from 'react';
import PropTypes from 'prop-types';
import { Zap, RefreshCw } from 'react-feather';
import Chance from 'chance';

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

export default function Configure({
  updateConfiguration,
  generateSector,
  isBuilder,
  columns,
  rows,
  name,
}) {
  const updateInput = ({ target }) => {
    const key = target.getAttribute('data-key');
    let { value } = target;
    if (target.type === 'number') {
      value = value ? Number.parseInt(value, 10) : null;
    } else if (target.type === 'checkbox') {
      value = target.checked;
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
        <Checkbox
          value={isBuilder}
          onChange={updateInput}
          label="Initialize Empty Sector"
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
          Generate
        </Button>
      </SubContainer>
    </ContentContainer>
  );
}

Configure.propTypes = {
  updateConfiguration: PropTypes.func.isRequired,
  generateSector: PropTypes.func.isRequired,
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
