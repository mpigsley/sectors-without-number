import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import ButtonLink from 'primitives/other/button-link';
import Button from 'primitives/other/button';

import './style.scss';

// eslint-disable-next-line react/prop-types
const renderAction = ({ key, to, ...props }, index) => {
  const Btn = to ? ButtonLink : Button;
  return (
    <Fragment key={key}>
      {index ? <span className="ActionHeader-Spacer" /> : null}
      <Btn minimal to={to} {...props} />
    </Fragment>
  );
};

export default function ActionHeader({ title, actions }) {
  let actionList;
  if (actions.length) {
    actionList = (
      <FlexContainer
        justify="center"
        shrink="0"
        className="ActionHeader-SubHeader"
      >
        {actions.map(renderAction)}
      </FlexContainer>
    );
  }

  return (
    <div className="ActionHeader">
      <FlexContainer align="center" shrink="0">
        <FlexContainer flex="1" justify="center" align="flexEnd">
          {typeof title === 'string' ? (
            <Header type={HeaderType.header2}>{title}</Header>
          ) : (
            title
          )}
        </FlexContainer>
      </FlexContainer>
      {actionList}
    </div>
  );
}

ActionHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      to: PropTypes.string,
    }),
  ),
};

ActionHeader.defaultProps = {
  actions: [],
};
