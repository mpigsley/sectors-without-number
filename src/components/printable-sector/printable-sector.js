import React from 'react';
import PropTypes from 'prop-types';

import { stringSortByKey } from 'utils/common';
import HexMap from 'components/hex-map';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/containers/flex-container';

import './style.css';

export default function PrintableSector({ printable, systems }) {
  return (
    <div>
      <div className="PrintableSector-Container">
        <HexMap hexes={printable.hexes} viewbox={printable.viewbox} />
      </div>
      <FlexContainer wrap justify="spaceEvenly">
        {Object.keys(systems)
          .map(key => systems[key])
          .sort(stringSortByKey('name'))
          .map(system =>
            <div key={system.key} className="PrintableSector-System">
              <FlexContainer align="baseline" justify="center">
                <Header
                  dark
                  type={HeaderType.header2}
                  className="PrintableSector-SystemName"
                >
                  {system.name}
                </Header>
                <Header
                  type={HeaderType.header4}
                  className="PrintableSector-SystemKey"
                >
                  ({system.key})
                </Header>
              </FlexContainer>
            </div>,
          )}
      </FlexContainer>
    </div>
  );
}

PrintableSector.propTypes = {
  systems: PropTypes.shape().isRequired,
  printable: PropTypes.shape({
    hexes: PropTypes.arrayOf(PropTypes.object).isRequired,
    viewbox: PropTypes.string.isRequired,
  }).isRequired,
};
