import React from 'react';
import PropTypes from 'prop-types';
import { Zap } from 'react-feather';

import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/containers/content-container';
import SubContainer from 'primitives/containers/sub-container';
import Input from 'primitives/other/input';
import Label from 'primitives/other/label';
import LinkIcon from 'primitives/other/link-icon';
import Link from 'primitives/other/link';

import './style.css';

export default function Configure({ seed, columns, rows, updateSector }) {
  const updateInput = e => {
    const key = e.target.getAttribute('data-key');
    let value = e.target.value;
    if (e.target.type === 'number') {
      value = value ? Number.parseInt(value, 10) : null;
    }
    updateSector(key, value);
  };

  const invalidText =
    columns > 30 || rows > 30
      ? <div className="Configure-Invalid">
          Column and row count can not be greater than 30.
        </div>
      : null;

  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header type={HeaderType.header2}>Configure</Header>
      <SubContainer noMargin direction="column" align="flexStart">
        {invalidText}
        <Label noPadding htmlFor="seed">
          Seed
        </Label>
        <Input
          data-key="seed"
          onChange={updateInput}
          name="seed"
          type="text"
          value={seed}
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
              value={rows || ''}
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
              value={columns || ''}
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
        <Link
          padded
          to={{
            pathname: '/sector',
            query: { s: seed, c: columns, r: rows },
          }}
        >
          <LinkIcon icon={Zap} size="20" />
          Generate
        </Link>
      </SubContainer>
    </ContentContainer>
  );
}

Configure.propTypes = {
  seed: PropTypes.string.isRequired,
  columns: PropTypes.number,
  rows: PropTypes.number,
  updateSector: PropTypes.func.isRequired,
};

Configure.defaultProps = {
  columns: null,
  rows: null,
};
