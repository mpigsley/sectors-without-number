import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';

import { map, includes } from 'constants/lodash';
import { Plus, Lock, Unlock, Layers, HelpCircle, Edit2 } from 'constants/icons';
import FlexContainer from 'primitives/container/flex-container';

import './style.css';

const ReactHint = ReactHintFactory(React);

export default class FloatingToolbar extends Component {
  static propTypes = {
    sectorId: PropTypes.string.isRequired,
    mapLocked: PropTypes.bool.isRequired,
    toggleMapLock: PropTypes.func.isRequired,
    layers: PropTypes.shape().isRequired,
    sectorLayers: PropTypes.shape().isRequired,
    toggleLayer: PropTypes.func.isRequired,
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

  renderLayer(key, text, editLink) {
    let editButton = null;
    if (!this.props.isShared && this.props.isSaved && editLink) {
      editButton = (
        <Link to={editLink} className="FloatingToolbar-ItemEdit">
          <Edit2 size={18} />
        </Link>
      );
    }
    return (
      <FlexContainer key={key} className="FloatingToolbar-SubItemOuter">
        <FlexContainer
          onClick={() => this.props.toggleLayer(key)}
          className={classNames('FloatingToolbar-SubItemName', {
            'FloatingToolbar-SubItemName--edit': !this.props.isShared,
            'FloatingToolbar-SubItemName--active':
              this.props.sectorLayers[key] === undefined ||
              this.props.sectorLayers[key],
          })}
        >
          {text}
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
              {this.renderLayer(
                'systemText',
                this.props.intl.formatMessage({ id: 'misc.hexSystemText' }),
              )}
              {this.renderLayer(
                'navigation',
                this.props.intl.formatMessage({ id: 'misc.navRoutes' }),
                `/sector/${this.props.sectorId}/navigation`,
              )}
              {map(this.props.layers, (layer, key) =>
                this.renderLayer(
                  key,
                  layer.name,
                  `/sector/${this.props.sectorId}/layer/${key}`,
                ),
              )}
              <FlexContainer className="FloatingToolbar-SubItemOuter">
                <Link
                  to={`/sector/${this.props.sectorId}/layer`}
                  className="FloatingToolbar-SubItemName FloatingToolbar-CreateLayer"
                >
                  <Plus size={18} /> <span>Create Layer</span>
                </Link>
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
