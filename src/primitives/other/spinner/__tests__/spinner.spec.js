import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '..';

describe('Spinner', () => {
  it('should render the 12 spinning dots', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner.hasClass('Spinner')).toBeTruthy();
    expect(spinner.children()).toHaveLength(12);
  });

  it('should render with a default size of 30', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner.prop('style')).toMatchObject({ width: 30, height: 30 });
  });

  it('should render with a custom size', () => {
    const size = 50;
    const spinner = shallow(<Spinner size={size} />);
    expect(spinner.prop('style')).toMatchObject({ width: size, height: size });
  });

  it('should default to light theme', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner.hasClass('Spinner--dark')).toBeFalsy();
  });

  it('should set dark theme appropriately', () => {
    const spinner = shallow(<Spinner isDark />);
    expect(spinner.hasClass('Spinner--dark')).toBeTruthy();
  });

  it('should pass through custom class name', () => {
    const className = 'test';
    const spinner = shallow(<Spinner className={className} />);
    expect(spinner.hasClass(className)).toBeTruthy();
  });
});
