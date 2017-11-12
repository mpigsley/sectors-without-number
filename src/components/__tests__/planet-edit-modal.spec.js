import React from 'react';
import { shallow } from 'enzyme';

import PlanetEditModal from '../planet-edit-modal/planet-edit-modal';

const defaultProps = {
  isOpen: false,
  onSubmit: () => {},
  onClose: () => {},
  systemKey: '',
  planetKeys: [],
};

describe('Planet Edit Modal', () => {
  it('should render a create modal if no system is given', () => {
    const systemEdit = shallow(<PlanetEditModal {...defaultProps} />);
    expect(systemEdit.prop('title')).toEqual('Create Planet');
  });

  it('should render an edit modal if a system is given', () => {
    const systemEdit = shallow(
      <PlanetEditModal {...defaultProps} planet={{}} />,
    );
    expect(systemEdit.prop('title')).toEqual('Edit Planet');
  });
});
