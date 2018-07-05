import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';

import { sortBy, map, includes, keys } from 'constants/lodash';
import {
  List,
  Plus,
  Lock,
  Unlock,
  Layers,
  HelpCircle,
  Edit2,
  Eye,
  EyeOff,
} from 'constants/icons';
import FlexContainer from 'primitives/container/flex-container';

import './style.css';

const ReactHint = ReactHintFactory(React);

export default class FloatingToolbar extends Component {
  static propTypes = {
    sectorId: PropTypes.string.isRequired,
    mapLocked: PropTypes.bool.isRequired,
    toggleMapLock: PropTypes.func.isRequired,
    playerView: PropTypes.bool.isRequired,
    togglePlayerView: PropTypes.func.isRequired,
    layers: PropTypes.shape().isRequired,
    sectorLayers: PropTypes.shape().isRequired,
    toggleLayer: PropTypes.func.isRequired,
    isSharedSector: PropTypes.bool.isRequired,
    isShared: PropTypes.bool.isRequired,
    isSaved: PropTypes.bool.isRequired,
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

  renderSwitcherIcon() {
    if (this.props.playerView) {
      return <EyeOff size={18} />;
    }
    return <Eye size={18} />;
  }

  renderViewSwitcher() {
    if (this.props.isSharedSector) {
      return null;
    }
    return (
      <FlexContainer
        data-rh={
          !this.props.playerView
            ? this.props.intl.formatMessage({ id: 'misc.playerViewSwitcher' })
            : undefined
        }
        onClick={this.props.togglePlayerView}
        className={classNames('FloatingToolbar-Item', {
          'FloatingToolbar-Lock--active': this.props.playerView,
        })}
      >
        {this.renderSwitcherIcon()}
      </FlexContainer>
    );
  }

  renderLayer(key, text, editLink) {
    let actionButton = null;
    if (!this.props.isShared && this.props.isSaved && editLink) {
      actionButton = (
        <Link to={editLink} className="FloatingToolbar-ItemAction">
          <Edit2 size={18} />
        </Link>
      );
    } else if (this.props.isShared && includes(keys(this.props.layers), key)) {
      actionButton = (
        <Link to={editLink} className="FloatingToolbar-ItemAction">
          <List size={18} />
        </Link>
      );
    }
    return (
      <FlexContainer key={key} className="FloatingToolbar-SubItemOuter">
        <FlexContainer
          onClick={() => this.props.toggleLayer(key)}
          className={classNames('FloatingToolbar-SubItemName', {
            'FloatingToolbar-SubItemName--edit': actionButton,
            'FloatingToolbar-SubItemName--active':
              this.props.sectorLayers[key] === undefined ||
              this.props.sectorLayers[key],
          })}
        >
          {text}
        </FlexContainer>
        {actionButton}
      </FlexContainer>
    );
  }

  renderCreateLayer() {
    if (this.props.isShared || !this.props.isSaved) {
      return null;
    }
    return (
      <FlexContainer className="FloatingToolbar-SubItemOuter">
        <Link
          to={`/sector/${this.props.sectorId}/layer`}
          className="FloatingToolbar-SubItemName FloatingToolbar-CreateLayer"
        >
          <Plus size={18} /> <FormattedMessage id="misc.createLayer" />
        </Link>
      </FlexContainer>
    );
  }

  render() {
    return (
      <div className="FloatingToolbar-Container">
        <FlexContainer className="FloatingToolbar" direction="column">
          {this.renderViewSwitcher()}
          {this.renderLock()}
          <FlexContainer className="FloatingToolbar-Item">
            <Layers size={18} />
            <FlexContainer
              className="FloatingToolbar-SubList"
              direction="column"
            >
              {this.renderLayer(
                'systemText',
                this.props.intl.formatMessage({ id: 'misc.hexSystemText' }),
              )}
              {this.renderLayer(
                'navigation',
                this.props.intl.formatMessage({ id: 'misc.navRoutes' }),
                `/sector/${this.props.sectorId}/navigation`,
              )}
              {sortBy(
                map(this.props.layers, (layer, key) => ({
                  ...layer,
                  sort: layer.name.toLowerCase(),
                  key,
                })),
                'sort',
              ).map(({ key, name }) =>
                this.renderLayer(
                  key,
                  name,
                  `/sector/${this.props.sectorId}/layer/${key}`,
                ),
              )}
              {this.renderCreateLayer()}
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
                  href="https://medium.com/sectors-without-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="FloatingToolbar-SubItemName"
                >
                  <FormattedMessage id="misc.blog" />
                </a>
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
