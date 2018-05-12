import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router';
import { Lock, Unlock, Layers, HelpCircle } from 'react-feather';
import ReactHintFactory from 'react-hint';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';

import './style.css';

const ReactHint = ReactHintFactory(React);

export default function FloatingToolbar({ mapLocked, toggleMapLock, intl }) {
  const renderSectorLock = () => {
    if (mapLocked) {
      return <Lock size={18} onClick={toggleMapLock} />;
    }
    return <Unlock size={18} onClick={toggleMapLock} />;
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
          className={classNames('FloatingToolbar-Item', {
            'FloatingToolbar-Lock--active': mapLocked,
          })}
        >
          {renderSectorLock()}
        </FlexContainer>
        <FlexContainer className="FloatingToolbar-Item">
          <Layers size={18} />
        </FlexContainer>
        <FlexContainer className="FloatingToolbar-Item">
          <HelpCircle size={18} />
          <FlexContainer className="FloatingToolbar-SubList" direction="column">
            <a
              href="https://goo.gl/forms/eOanpGEuglCYYg7u2"
              target="_blank"
              rel="noopener noreferrer"
              className="FloatingToolbar-SubItem"
            >
              <FormattedMessage id="misc.reportProblem" />
            </a>
            <Link to="/changelog" className="FloatingToolbar-SubItem">
              <FormattedMessage id="misc.changelog" />
            </Link>
            <a
              href="https://github.com/mpigsley/sectors-without-number"
              target="_blank"
              rel="noopener noreferrer"
              className="FloatingToolbar-SubItem"
            >
              Github
            </a>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <ReactHint className="react-hint" events position="left" />
    </div>
  );
}

FloatingToolbar.propTypes = {
  mapLocked: PropTypes.bool.isRequired,
  toggleMapLock: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};
