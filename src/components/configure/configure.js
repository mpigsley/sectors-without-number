import React from 'react';
import PropTypes from 'prop-types';
import { Zap } from 'react-feather';

import {
  Header2,
  Link,
  ContentContainer,
  SubContainer,
  Input,
  Label,
  LinkIcon,
} from '../../primitives';
import { ButtonContainer, PaddedButtons } from './components';

export default function Configure({
  seed,
  columns,
  rows,
  updateSector,
}) {
  const updateInput = (e) => {
    const key = e.target.getAttribute('data-key');
    let value = e.target.value;
    if (e.target.type === 'number') {
      value = value ? Number.parseInt(value, 10) : null;
    }
    updateSector(key, value);
  };

  return (
    <ContentContainer direction="column" align="center" justify="center">
      <Header2>Configure</Header2>
      <SubContainer noMargin direction="column" align="flex-start">
        <Label noPadding htmlFor="seed">
          Seed
        </Label>
        <Input data-key="seed" onChange={updateInput} name="seed" type="text" value={seed} />
        <SubContainer noMargin>
          <ButtonContainer noMargin direction="column" align="flex-start">
            <Label htmlFor="rows">Rows</Label>
            <Input
              data-key="rows"
              onChange={updateInput}
              name="rows"
              type="number"
              value={rows || ''}
            />
          </ButtonContainer>
          <ButtonContainer noMargin direction="column" align="flex-start">
            <Label htmlFor="columns">Columns</Label>
            <Input
              data-key="columns"
              onChange={updateInput}
              name="columns"
              type="number"
              value={columns || ''}
            />
          </ButtonContainer>
        </SubContainer>
      </SubContainer>
      <PaddedButtons wrap justify="center" align="center">
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
      </PaddedButtons>
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
