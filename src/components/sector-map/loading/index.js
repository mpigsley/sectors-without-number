import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import Loading from 'primitives/other/loading';
import HexMap from 'components/hex-map';

import hexGenerator from 'utils/hex/generator';

function SectorLoading({ intl }) {
  const { hexes } = hexGenerator({
    renderSector: false,
    height: window.innerHeight,
    width: window.innerWidth,
  });

  return (
    <div>
      <HexMap
        height={window.innerHeight}
        width={window.innerWidth}
        hexes={hexes}
      />
      <Loading message={intl.formatMessage({ id: 'misc.loadingSector' })} />
    </div>
  );
}

SectorLoading.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SectorLoading);
