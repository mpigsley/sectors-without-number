import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ChevronRight } from 'react-feather';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';

import './style.css';

export default class LinkRow extends Component {
  state = {
    hovered: false,
  };

  render() {
    const { to, title, additional, additionalIcon } = this.props;
    const Icon = this.state.hovered
      ? ChevronRight
      : additionalIcon || ChevronRight;
    return (
      <Link
        className="LinkRow"
        to={to}
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
            size={additionalIcon && !this.state.hovered ? 16 : 20}
            className={classNames('LinkRow-RightArrow', {
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
  additionalIcon: PropTypes.node,
};

LinkRow.defaultProps = {
  additional: null,
  additionalIcon: null,
};
