import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import ButtonLink from 'primitives/other/button-link';
import Button from 'primitives/other/button';

import './style.css';

export default function FactionTable({
  intl,
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
          <FormattedMessage id="misc.factions" />
        </Header>
        <FlexContainer>
          <ButtonLink
            to={`/elements/${currentSector}/faction/new`}
            minimal
            className="FactionTable-CreateAction"
          >
            <FormattedMessage id="misc.createFaction" />
          </ButtonLink>
          <Button minimal>
            <FormattedMessage
              id="misc.exportEntity"
              values={{ entity: intl.formatMessage({ id: 'misc.factions' }) }}
            />
          </Button>
        </FlexContainer>
      </FlexContainer>
      <div className="FactionTable-Table">Table</div>
      <div className="FactionTable-Sidebar">{children}</div>
    </div>
  );
}

FactionTable.propTypes = {
  intl: intlShape.isRequired,
  children: PropTypes.node.isRequired,
  currentSector: PropTypes.string.isRequired,
  currentFaction: PropTypes.shape({}),
  currentElement: PropTypes.string,
};

FactionTable.defaultProps = {
  currentFaction: undefined,
  currentElement: undefined,
};
