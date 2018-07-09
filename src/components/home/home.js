import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import StarBackground from 'components/star-background';

import './style.css';

export default class Home extends Component {
  static propTypes = {
    generateSector: PropTypes.func.isRequired,
  };

  state = {
    didScroll: false,
  };

  render() {
    return (
      <Fragment>
        <StarBackground
          onScroll={() => {
            if (!this.state.disScroll) {
              this.setState({ didScroll: true });
            }
          }}
        >
          <FlexContainer
            direction="column"
            align="center"
            className="Home-HeroContainer"
          >
            <FlexContainer
              direction="column"
              align="center"
              justify="center"
              flex="1"
              className="Home-Hero"
            >
              <div className="Home-Glitch">
                <Header
                  noMargin
                  type={HeaderType.header1}
                  className="Home-MainHeader"
                  data-text="Sectors Without Number"
                >
                  Sectors Without Number
                </Header>
                <Header
                  type={HeaderType.header2}
                  className="Home-SubHeader"
                  data-text="Sector Generator"
                >
                  Sector Generator
                </Header>
              </div>
              <FlexContainer className="Home-Actions">
                <Link to="/configure" className="Home-Action">
                  <span className="Home-HexagonWrap">
                    <span className="Home-Hexagon" />
                  </span>
                  <FormattedMessage id="misc.configure" />
                </Link>
                <button
                  onClick={this.props.generateSector}
                  className="Home-Action"
                >
                  <span className="Home-HexagonWrap">
                    <span className="Home-Hexagon" />
                  </span>
                  <FormattedMessage id="misc.generate" />
                </button>
              </FlexContainer>
            </FlexContainer>
            <div
              className={classNames('Home-ArrowDown', {
                'Home-ArrowDown--hidden': this.state.didScroll,
              })}
            />
          </FlexContainer>
          <h1>Some more stuff</h1>
        </StarBackground>
      </Fragment>
    );
  }
}
