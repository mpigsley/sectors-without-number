import React from 'react';
import { shallow } from 'enzyme';

import SystemEditModal from '../system-edit-modal/system-edit-modal';

const defaultProps = {
  isOpen: false,
  onSubmit: () => {},
  onClose: () => {},
  systemKey: '',
  planetKeys: [],
};

describe('System Edit Modal', () => {
  it('should render a create modal if no system is given', () => {
    const systemEdit = shallow(<SystemEditModal {...defaultProps} />);
    expect(systemEdit.prop('title')).toEqual('Create System');
  });

  it('should render an edit modal if a system is given', () => {
    const systemEdit = shallow(
      <SystemEditModal
        {...defaultProps}
        system={{ key: '', name: '', planets: {} }}
      />,
    );
    expect(systemEdit.prop('title')).toEqual('Edit System');
  });
});
