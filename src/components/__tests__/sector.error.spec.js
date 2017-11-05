import React from 'react';
import { shallow } from 'enzyme';

import SectorError from '../sector/error';

const defaultProps = {
  generateSector: () => {},
};

describe('Sector Error', () => {
  it('should render a link back to the dashboard', () => {
    const sectorError = shallow(<SectorError {...defaultProps} />);
    expect(sectorError.find('ButtonLink').exists()).toEqual(true);
  });

  it('should render a link to render a new sector', () => {
    const sectorError = shallow(<SectorError {...defaultProps} />);
    expect(sectorError.find('Button').exists()).toEqual(true);
  });

  it('should generate sector if generate is clicked', () => {
    const generateSector = jest.fn();
    const sectorError = shallow(
      <SectorError {...defaultProps} generateSector={generateSector} />,
    );
    sectorError.find('Button').simulate('click');
    expect(generateSector).toHaveBeenCalledTimes(1);
  });
});
