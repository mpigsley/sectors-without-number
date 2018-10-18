import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ChevronRight } from 'constants/icons';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.scss';

export default class LinkRow extends Component {
  state = {
    hovered: false,
  };

  render() {
    const {
      to,
      title,
      additional,
      additionalIcon,
      className,
      arrowClassName,
    } = this.props;
    const { hovered } = this.state;
    const Icon = hovered ? ChevronRight : additionalIcon || ChevronRight;
    return (
      <Link
        to={to}
        className={classNames('LinkRow', className)}
        onMouseOver={() => this.setState({ hovered: true })}
        onFocus={() => this.setState({ hovered: true })}
        onMouseOut={() => this.setState({ hovered: false })}
        onBlur={() => this.setState({ hovered: false })}
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
      </Link>
    );
  }
}

LinkRow.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  additional: PropTypes.string,
  additionalIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  className: PropTypes.string,
  arrowClassName: PropTypes.string,
};

LinkRow.defaultProps = {
  additional: null,
  additionalIcon: null,
  className: null,
  arrowClassName: null,
};
