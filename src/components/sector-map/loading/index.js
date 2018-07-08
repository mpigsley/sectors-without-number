import React, { Fragment } from 'react';

import Loading from 'primitives/other/loading';
import HexMap from 'components/hex-map';

import hexGenerator from 'utils/hex/generator';

export default function SectorLoading() {
  const { hexes } = hexGenerator({
    renderSector: false,
    height: window.innerHeight,
    width: window.innerWidth,
  });

  return (
    <Fragment>
      <HexMap
        height={window.innerHeight}
        width={window.innerWidth}
        hexes={hexes}
      />
      <Loading />
    </Fragment>
  );
}
