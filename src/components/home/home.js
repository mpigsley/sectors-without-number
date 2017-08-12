import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Settings, Zap } from 'react-feather';

import { stringSortByKey } from 'utils/common';
import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/containers/content-container';
import FlexContainer from 'primitives/containers/flex-container';
import SubContainer from 'primitives/containers/sub-container';
import LinkIcon from 'primitives/other/link-icon';
import Link from 'primitives/other/link';

import './style.css';

export default class Home extends Component {
  static propTypes = {
    seed: PropTypes.string.isRequired,
    saved: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);

    this.setSelected = this.setSelected.bind(this);
  }

  state = {
    selected: null,
  };

  setSelected(selected) {
    return () => {
      this.setState({ selected });
    };
  }

  renderSaved() {
    if (Object.keys(this.props.saved).length === 0) {
      return null;
    }
    return (
      <SubContainer wrap direction="row" className="Home-Saved">
        <FlexContainer
          direction="column"
          align="flexEnd"
          className="Home-SavedTitleContainer"
        >
          <Header type={HeaderType.header3} className="Home-SavedTitle">
            Saved Sectors
          </Header>
          <div className="Home-SavedSecondary">
            Select a saved sector to begin.
          </div>
        </FlexContainer>
        <ul className="Home-SavedList">
          {Object.keys(this.props.saved)
            .map(key => this.props.saved[key])
            .sort(stringSortByKey('name'))
            .map(({ seed, name, rows, columns }) =>
              <li
                key={seed}
                onClick={this.setSelected(seed)}
                className={classNames('Home-SavedItem', {
                  'Home-SavedItem--selected': seed === this.state.selected,
                })}
              >
                <span className="Home-SavedName">
                  {name}
                </span>
                <span className="Home-SavedSecondary">
                  ({columns}, {rows})
                </span>
              </li>,
            )}
        </ul>
      </SubContainer>
    );
  }

  render() {
    return (
      <ContentContainer direction="column" align="center" justify="center">
        <Header type={HeaderType.header1}>Sectors Without Number</Header>
        <SubContainer fullWidth justify="center" align="center">
          <div className="Home-RowContainer">
            <div className="Home-Row Home-Row--left" />
          </div>
          <Header type={HeaderType.header2}>Sector Generator</Header>
          <div className="Home-RowContainer">
            <div className="Home-Row" />
          </div>
        </SubContainer>
        {this.renderSaved()}
        <SubContainer wrap justify="center" align="center">
          <Link padded to="/configure">
            <LinkIcon icon={Settings} size="20" />
            Configure
          </Link>
          <Link
            padded
            to={{
              pathname: '/sector',
              query: { s: this.props.seed },
            }}
          >
            <LinkIcon icon={Zap} size="20" />
            Generate
          </Link>
        </SubContainer>
      </ContentContainer>
    );
  }
}
