import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';
import includes from 'lodash/includes';

import { Lock, Unlock, Layers, HelpCircle, Edit2 } from 'constants/icons';
import FlexContainer from 'primitives/container/flex-container';

import './style.css';

const ReactHint = ReactHintFactory(React);

export default class FloatingToolbar extends Component {
  static propTypes = {
    sectorId: PropTypes.string.isRequired,
    mapLocked: PropTypes.bool.isRequired,
    toggleMapLock: PropTypes.func.isRequired,
    layers: PropTypes.shape().isRequired,
    toggleLayer: PropTypes.func.isRequired,
    isShared: PropTypes.bool.isRequired,
    redirectToHome: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    if (
      this.props.isShared &&
      includes(this.props.location.pathname.split('/'), 'navigation')
    ) {
      this.props.redirectToHome(this.props.sectorId);
    }
  }

  renderSectorLock() {
    if (this.props.mapLocked) {
      return <Lock size={18} />;
    }
    return <Unlock size={18} />;
  }

  renderLock() {
    if (this.props.isShared) {
      return null;
    }
    return (
      <FlexContainer
        data-rh={
          !this.props.mapLocked
            ? this.props.intl.formatMessage({ id: 'misc.mapLockInfo' })
            : undefined
        }
        onClick={this.props.toggleMapLock}
        className={classNames('FloatingToolbar-Item', {
          'FloatingToolbar-Lock--active': this.props.mapLocked,
        })}
      >
        {this.renderSectorLock()}
      </FlexContainer>
    );
  }

  renderLayers() {
    let editButton = null;
    if (!this.props.isShared) {
      editButton = (
        <Link
          to={`/sector/${this.props.sectorId}/navigation`}
          className="FloatingToolbar-ItemEdit"
        >
          <Edit2 size={18} />
        </Link>
      );
    }
    return (
      <FlexContainer className="FloatingToolbar-SubItemOuter">
        <FlexContainer
          onClick={() => this.props.toggleLayer('navigation')}
          className={classNames('FloatingToolbar-SubItemName', {
            'FloatingToolbar-SubItemName--edit': !this.props.isShared,
            'FloatingToolbar-SubItemName--active':
              this.props.layers.navigation === undefined ||
              this.props.layers.navigation,
          })}
        >
          <FormattedMessage id="misc.navRoutes" />
        </FlexContainer>
        {editButton}
      </FlexContainer>
    );
  }

  render() {
    return (
      <div className="FloatingToolbar-Container">
        <FlexContainer className="FloatingToolbar" direction="column">
          {this.renderLock()}
          <FlexContainer className="FloatingToolbar-Item">
            <Layers size={18} />
            <FlexContainer
              className="FloatingToolbar-SubList"
              direction="column"
            >
              {this.renderLayers()}
              <FlexContainer className="FloatingToolbar-SubItemOuter">
                <FlexContainer
                  onClick={() => this.props.toggleLayer('systemText')}
                  className={classNames('FloatingToolbar-SubItemName', {
                    'FloatingToolbar-SubItemName--active':
                      this.props.layers.systemText === undefined ||
                      this.props.layers.systemText,
                  })}
                >
                  <FormattedMessage id="misc.hexSystemText" />
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer className="FloatingToolbar-Item">
            <HelpCircle size={18} />
            <FlexContainer
              className="FloatingToolbar-SubList"
              direction="column"
            >
              <FlexContainer className="FloatingToolbar-SubItemOuter">
                <a
                  href="https://goo.gl/forms/eOanpGEuglCYYg7u2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="FloatingToolbar-SubItemName"
                >
                  <FormattedMessage id="misc.reportProblem" />
                </a>
              </FlexContainer>
              <FlexContainer className="FloatingToolbar-SubItemOuter">
                <Link to="/changelog" className="FloatingToolbar-SubItemName">
                  <FormattedMessage id="misc.changelog" />
                </Link>
              </FlexContainer>
              <FlexContainer className="FloatingToolbar-SubItemOuter">
                <a
                  href="https://github.com/mpigsley/sectors-without-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="FloatingToolbar-SubItemName"
                >
                  Github
                </a>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <ReactHint className="react-hint" events position="left" />
      </div>
    );
  }
}
