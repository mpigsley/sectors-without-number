import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import ButtonLink from 'primitives/other/button-link';
import Button from 'primitives/other/button';

import './style.css';

export default function FactionTable({
  children,
  currentSector,
  currentFaction,
  currentElement,
}) {
  const isSidebarOpen = !!currentFaction || !!currentElement;
  return (
    <div
      className={classNames('FactionTable', {
        'FactionTable--sidebarOpen': isSidebarOpen,
      })}
    >
      <FlexContainer
        className="FactionTable-Header"
        justify="spaceBetween"
        align="flexEnd"
      >
        <Header type={HeaderType.header2} noMargin>
          Factions
        </Header>
        <FlexContainer>
          <ButtonLink
            to={`/elements/${currentSector}/faction/new`}
            minimal
            className="FactionTable-CreateAction"
          >
            Create Faction
          </ButtonLink>
          <Button minimal>Export Factions</Button>
        </FlexContainer>
      </FlexContainer>
      <div className="FactionTable-Table">Table</div>
      <div className="FactionTable-Sidebar">{children}</div>
    </div>
  );
}

FactionTable.propTypes = {
  children: PropTypes.node.isRequired,
  currentSector: PropTypes.string.isRequired,
  currentFaction: PropTypes.shape({}),
  currentElement: PropTypes.string,
};

FactionTable.defaultProps = {
  currentFaction: undefined,
  currentElement: undefined,
};
