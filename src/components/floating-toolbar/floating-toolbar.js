import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';

import { sortBy, map, includes, keys } from 'constants/lodash';
import {
  List,
  Settings,
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

import './style.scss';

const ReactHint = ReactHintFactory(React);

export default class FloatingToolbar extends Component {
  constructor(props) {
    super(props);

    const { isShared, location, sectorId, redirectToHome } = props;
    if (isShared && includes(location.pathname.split('/'), 'navigation')) {
      redirectToHome(sectorId);
    }
  }

  renderSectorLock() {
    const { mapLocked } = this.props;
    if (mapLocked) {
      return <Lock size={18} />;
    }
    return <Unlock size={18} />;
  }

  renderLock() {
    const { isShared, mapLocked, intl, toggleMapLock } = this.props;
    if (isShared) {
      return null;
    }
    return (
      <FlexContainer
        data-rh={
          !mapLocked
            ? intl.formatMessage({ id: 'misc.mapLockInfo' })
            : undefined
        }
        onClick={toggleMapLock}
        className={classNames('FloatingToolbar-Item', {
          'FloatingToolbar-Lock--active': mapLocked,
        })}
      >
        {this.renderSectorLock()}
      </FlexContainer>
    );
  }

  renderSwitcherIcon() {
    const { playerView } = this.props;
    if (playerView) {
      return <EyeOff size={18} />;
    }
    return <Eye size={18} />;
  }

  renderViewSwitcher() {
    const { isSharedSector, playerView, intl, togglePlayerView } = this.props;
    if (isSharedSector) {
      return null;
    }
    return (
      <FlexContainer
        data-rh={
          !playerView
            ? intl.formatMessage({ id: 'misc.playerViewSwitcher' })
            : undefined
        }
        onClick={togglePlayerView}
        className={classNames('FloatingToolbar-Item', {
          'FloatingToolbar-Lock--active': playerView,
        })}
      >
        {this.renderSwitcherIcon()}
      </FlexContainer>
    );
  }

  renderLayer(key, text, editLink) {
    let actionButton = null;
    const { isShared, isSaved, layers, toggleLayer, sectorLayers } = this.props;
    if (key === 'systemText') {
      actionButton = (
        <Link to={editLink} className="FloatingToolbar-ItemAction">
          <Settings size={18} />
        </Link>
      );
    } else if (!isShared && isSaved && editLink) {
      actionButton = (
        <Link to={editLink} className="FloatingToolbar-ItemAction">
          <Edit2 size={18} />
        </Link>
      );
    } else if (isShared && includes(keys(layers), key)) {
      actionButton = (
        <Link to={editLink} className="FloatingToolbar-ItemAction">
          <List size={18} />
        </Link>
      );
    }
    return (
      <FlexContainer key={key} className="FloatingToolbar-SubItemOuter">
        <FlexContainer
          onClick={() => toggleLayer(key)}
          className={classNames('FloatingToolbar-SubItemName', {
            'FloatingToolbar-SubItemName--edit': actionButton,
            'FloatingToolbar-SubItemName--active':
              sectorLayers[key] === undefined || sectorLayers[key],
          })}
        >
          {text}
        </FlexContainer>
        {actionButton}
      </FlexContainer>
    );
  }

  renderCreateLayer() {
    const { isShared, isSaved, sectorId } = this.props;
    if (isShared || !isSaved) {
      return null;
    }
    return (
      <FlexContainer className="FloatingToolbar-SubItemOuter">
        <Link
          to={`/sector/${sectorId}/layer`}
          className="FloatingToolbar-SubItemName FloatingToolbar-CreateLayer"
        >
          <Plus size={18} /> <FormattedMessage id="misc.createLayer" />
        </Link>
      </FlexContainer>
    );
  }

  render() {
    const { isShared, intl, sectorId, layers } = this.props;
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
                intl.formatMessage({ id: 'misc.hexText' }),
                `/sector/${sectorId}/settings`,
              )}
              {this.renderLayer(
                'navigation',
                intl.formatMessage({ id: 'misc.navRoutes' }),
                `/sector/${sectorId}/navigation`,
              )}
              {!isShared &&
                this.renderLayer(
                  'factions',
                  intl.formatMessage({ id: 'misc.factions' }),
                  `/elements/${sectorId}/faction`,
                )}
              {sortBy(
                map(layers, (layer, key) => ({
                  ...layer,
                  sort: layer.name.toLowerCase(),
                  key,
                })),
                'sort',
              ).map(({ key, name }) =>
                this.renderLayer(key, name, `/sector/${sectorId}/layer/${key}`),
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

FloatingToolbar.propTypes = {
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
