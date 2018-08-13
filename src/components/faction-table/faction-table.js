import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';

import './style.css';

export default function FactionTable({ children }) {
  return (
    <div className="FactionTable">
      <FlexContainer
        className="FactionTable-Header"
        justify="spaceBetween"
        align="flexEnd"
      >
        <Header type={HeaderType.header2} noMargin>
          Factions
        </Header>
        <Button minimal>Export Factions</Button>
      </FlexContainer>
      <div className="FactionTable-Table">Table</div>
      {children}
    </div>
  );
}

FactionTable.propTypes = {
  children: PropTypes.node.isRequired,
};
