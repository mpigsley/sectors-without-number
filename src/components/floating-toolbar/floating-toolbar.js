import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Lock, Unlock } from 'react-feather';
import ReactHintFactory from 'react-hint';
import { intlShape } from 'react-intl';

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
      <ReactHint events position="left" />
    </FlexContainer>
  );
}

FloatingToolbar.propTypes = {
  mapLocked: PropTypes.bool.isRequired,
  toggleMapLock: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};
