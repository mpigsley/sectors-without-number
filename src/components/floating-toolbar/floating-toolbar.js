import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router';
import { Lock, Unlock, Layers, HelpCircle, Edit2 } from 'react-feather';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';

import './style.css';

const ReactHint = ReactHintFactory(React);

export default function FloatingToolbar({
  sectorId,
  mapLocked,
  toggleMapLock,
  layers,
  toggleLayer,
  intl,
}) {
  const renderSectorLock = () => {
    if (mapLocked) {
      return <Lock size={18} />;
    }
    return <Unlock size={18} />;
  };

  return (
    <div className="FloatingToolbar-Container">
      <FlexContainer className="FloatingToolbar" direction="column">
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
          {renderSectorLock()}
        </FlexContainer>
        <FlexContainer className="FloatingToolbar-Item">
          <Layers size={18} />
          <FlexContainer className="FloatingToolbar-SubList" direction="column">
            <FlexContainer className="FloatingToolbar-SubItemOuter">
              <FlexContainer
                onClick={() => toggleLayer('navigation')}
                className={classNames(
                  'FloatingToolbar-SubItemName',
                  'FloatingToolbar-SubItemName--edit',
                  {
                    'FloatingToolbar-SubItemName--active':
                      layers.navigation === undefined || layers.navigation,
                  },
                )}
              >
                Navigation Routes
              </FlexContainer>
              <Link
                to={`/sector/${sectorId}/navigation`}
                className="FloatingToolbar-ItemEdit"
              >
                <Edit2 size={18} />
              </Link>
            </FlexContainer>
            <FlexContainer className="FloatingToolbar-SubItemOuter">
              <FlexContainer
                onClick={() => toggleLayer('systemText')}
                className={classNames('FloatingToolbar-SubItemName', {
                  'FloatingToolbar-SubItemName--active':
                    layers.systemText === undefined || layers.systemText,
                })}
              >
                Hex System Text
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer className="FloatingToolbar-Item">
          <HelpCircle size={18} />
          <FlexContainer className="FloatingToolbar-SubList" direction="column">
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

FloatingToolbar.propTypes = {
  sectorId: PropTypes.string.isRequired,
  mapLocked: PropTypes.bool.isRequired,
  toggleMapLock: PropTypes.func.isRequired,
  layers: PropTypes.shape().isRequired,
  toggleLayer: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};
