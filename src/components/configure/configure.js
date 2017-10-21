import React from 'react';
import PropTypes from 'prop-types';
import { Zap } from 'react-feather';
import Chance from 'chance';

import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';
import Input from 'primitives/form/input';
import Label from 'primitives/form/label';
import LinkIcon from 'primitives/other/link-icon';
import ButtonLink from 'primitives/other/button-link';

import './style.css';

export default function Configure({ updateConfiguration, columns, rows }) {
  const updateInput = e => {
    const key = e.target.getAttribute('data-key');
    let value = e.target.value;
    if (e.target.type === 'number') {
      value = value ? Number.parseInt(value, 10) : null;
    }
    updateConfiguration(key, value);
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
  columns: PropTypes.number,
  rows: PropTypes.number,
};

Configure.defaultProps = {
  columns: '',
  rows: '',
};
