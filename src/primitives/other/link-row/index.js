import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ChevronRight } from 'constants/icons';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.scss';

export default function LinkRow({
  to,
  title,
  additional,
  additionalIcon,
  className,
  arrowClassName,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = hovered ? ChevronRight : additionalIcon || ChevronRight;
  const Wrapper = to ? Link : FlexContainer;
  return (
    <Wrapper
      to={to}
      className={classNames('LinkRow', className)}
      onMouseOver={() => setHovered(true)}
      onFocus={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      {...rest}
    >
      <FlexContainer justify="spaceBetween" flex="1">
        <FlexContainer flex="1" align="baseline">
          <Header type={HeaderType.header4} className="LinkRow-Name">
            {title}
          </Header>
          {additional && (
            <div className="LinkRow-Additional">({additional})</div>
          )}
        </FlexContainer>
        <Icon
          size={16}
          className={classNames('LinkRow-RightArrow', arrowClassName, {
            'LinkRow-AdditionalIcon': additionalIcon,
          })}
        />
      </FlexContainer>
    </Wrapper>
  );
}

LinkRow.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string.isRequired,
  additional: PropTypes.string,
  additionalIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  className: PropTypes.string,
  arrowClassName: PropTypes.string,
};

LinkRow.defaultProps = {
  to: null,
  additional: null,
  additionalIcon: null,
  className: null,
  arrowClassName: null,
};
