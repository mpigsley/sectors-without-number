import React from 'react';

import Loading from 'primitives/regions/loading';
import HexMap from 'components/hex-map';

import hexGenerator from 'utils/hex/generator';

export default function SectorLoading() {
  const { hexes } = hexGenerator({
    renderSector: false,
    height: window.innerHeight,
    width: window.innerWidth,
  });

  return (
    <>
      <HexMap
        height={window.innerHeight}
        width={window.innerWidth}
        hexes={hexes}
      />
      <Loading />
    </>
  );
}
