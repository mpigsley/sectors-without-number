import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Hex from 'components/hex';
import MovementVector, { MarkerDefs } from 'components/movement-vector';
import AbsoluteContainer from 'primitives/container/absolute-container';
import ContentContainer from 'primitives/container/content-container';
import SubContainer from 'primitives/container/sub-container';

import './style.css';

export default function HexMap({
  height,
  width,
  viewbox,
  holdKey,
  activeKey,
  hexes,
}) {
  let emptyMessage = null;
  if (hexes.length === 0) {
    emptyMessage = (
      <AbsoluteContainer>
        <ContentContainer direction="column" align="center" justify="center">
          <SubContainer className="HexMap-Message">
            Your browser window is too small to render the sector. Please try on
            a larger screen.
          </SubContainer>
        </ContentContainer>
      </AbsoluteContainer>
    );
  }
  return (
    <div className="HexMap-Container">
      {emptyMessage}
      <svg
        className={classNames('HexMap-SVG', {
          'HexMap-SVG--drag': !!holdKey,
        })}
        width={width}
        height={height}
        viewBox={viewbox}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>{MarkerDefs}</defs>
        {hexes.map(hex => (
          <Hex data={hex} key={hex.hexKey} active={hex.hexKey === activeKey} />
        ))}
        <MovementVector hexes={hexes} />
      </svg>
    </div>
  );
}

HexMap.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  viewbox: PropTypes.string,
  holdKey: PropTypes.string,
  activeKey: PropTypes.string,
  hexes: PropTypes.arrayOf(
    PropTypes.shape({
      hexKey: PropTypes.string.isRequired,
    }),
  ),
};

HexMap.defaultProps = {
  height: null,
  width: null,
  viewbox: null,
  holdKey: null,
  activeKey: null,
  hexes: [],
};
