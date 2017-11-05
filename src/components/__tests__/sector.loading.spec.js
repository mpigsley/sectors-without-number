import React from 'react';
import { shallow } from 'enzyme';

import SectorLoading from '../sector/loading';

const defaultProps = {
  generateSector: () => {},
};

describe('Sector Loading', () => {
  it('should render a a spinner', () => {
    const sectorLoading = shallow(<SectorLoading {...defaultProps} />);
    expect(sectorLoading.find('Spinner').exists()).toEqual(true);
  });

  it('should render a loading sector header', () => {
    const sectorLoading = shallow(<SectorLoading {...defaultProps} />);
    expect(sectorLoading.find('Header').exists()).toEqual(true);
    expect(
      sectorLoading
        .find('Header')
        .children()
        .text(),
    ).toEqual('Loading Sector');
  });
});
