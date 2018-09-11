import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import ActionHeader from 'primitives/text/action-header';
import ButtonLink from 'primitives/other/button-link';

import './style.css';

export default function SidebarContainer({ title, actions, footer, children }) {
  return (
    <FlexContainer className="SidebarContainer" direction="column">
      <ActionHeader title={title} actions={actions} />
      <FlexContainer direction="column" flex="1" scroll>
        {children}
      </FlexContainer>
      {footer || (
        <div className="SidebarContainer-Footer">
          <FlexContainer justify="center">
            <ButtonLink
              minimal
              to="https://www.patreon.com/sectorswithoutnumber"
              target="_blank"
              className="SidebarContainer-Patreon"
            >
              <FormattedMessage id="misc.becomePatron" />
            </ButtonLink>
          </FlexContainer>
        </div>
      )}
    </FlexContainer>
  );
}

SidebarContainer.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      to: PropTypes.string,
    }),
  ),
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

SidebarContainer.defaultProps = {
  actions: [],
  footer: undefined,
};
