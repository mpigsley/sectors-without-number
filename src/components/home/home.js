import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Chance from 'chance';
import { Settings, Zap, Download, Delete, X } from 'react-feather';

import { stringSortByKey } from 'utils/common';
import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/containers/content-container';
import FlexContainer from 'primitives/containers/flex-container';
import SubContainer from 'primitives/containers/sub-container';
import LinkIcon from 'primitives/other/link-icon';
import ButtonLink from 'primitives/other/button-link';
import Button from 'primitives/other/button';

import './style.css';

export default class Home extends Component {
  static propTypes = {
    saved: PropTypes.shape().isRequired,
    deleteSector: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.setSelected = this.setSelected.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  state = {
    selected: null,
  };

  onDelete() {
    const toDelete = this.state.selected;
    this.setState({ selected: null }, () => {
      this.props.deleteSector(toDelete);
    });
  }

  onCancel() {
    this.setState({ selected: null });
  }

  setSelected(selected) {
    return () => {
      this.setState({
        selected: selected === this.state.selected ? null : selected,
      });
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

  renderActions() {
    if (this.state.selected) {
      return (
        <SubContainer wrap justify="center" align="center">
          <Button onClick={this.onCancel}>
            <LinkIcon icon={X} size="20" />
            Cancel
          </Button>
          <Button onClick={this.onDelete}>
            <LinkIcon icon={Delete} size="20" />
            Delete
          </Button>
          <ButtonLink
            to={{
              pathname: '/sector',
              query: {
                s: this.state.selected,
                r: this.props.saved[this.state.selected].rows,
                c: this.props.saved[this.state.selected].columns,
              },
            }}
          >
            <LinkIcon icon={Download} size="20" />
            Load
          </ButtonLink>
        </SubContainer>
      );
    }
    return (
      <SubContainer wrap justify="center" align="center">
        <ButtonLink to="/configure">
          <LinkIcon icon={Settings} size="20" />
          Configure
        </ButtonLink>
        <ButtonLink
          to={{
            pathname: '/sector',
            query: { s: new Chance().hash({ length: 15 }) },
          }}
        >
          <LinkIcon icon={Zap} size="20" />
          Generate
        </ButtonLink>
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
        {this.renderActions()}
      </ContentContainer>
    );
  }
}
