import React from 'react';
import { shallow } from 'enzyme';

import Modal from 'primitives/modal/modal';
import AccountManager from '../account-manager';

describe('AccountManager', () => {
  it("should render nothing if it's not initialized", () => {
    const accountManager = shallow(<AccountManager />);
    expect(accountManager.html()).toEqual(null);
  });

  it('should render the login button if user is undefined', () => {
    const accountManager = shallow(<AccountManager isInitialized />);
    expect(accountManager.hasClass('AccountManager-Button')).toBeTruthy();
  });

  it('should open login modal if login button is clicked', () => {
    const openLoginModal = jest.fn();
    const accountManager = shallow(
      <AccountManager isInitialized openLoginModal={openLoginModal} />,
    );
    accountManager.simulate('click');
    expect(openLoginModal).toHaveBeenCalledTimes(1);
  });

  it('should render with a modal and a dropdown if user exists', () => {
    const accountManager = shallow(<AccountManager isInitialized user={{}} />);
    expect(
      accountManager.find('.AccountManager-Dropdown').exists(),
    ).toBeTruthy();
    expect(accountManager.find(Modal).exists()).toBeTruthy();
  });

  it('should render account manager button with default user name if user exists', () => {
    const accountManager = shallow(<AccountManager isInitialized user={{}} />);
    expect(accountManager.hasClass('AccountManager-Button')).toBeTruthy();
    expect(
      accountManager
        .find('.AccountManager-Dropdown')
        .dive()
        .text()
        .startsWith('User Account'),
    ).toEqual(true);
  });

  it('should render account manager button with user name if user exists', () => {
    const testName = 'testName';
    const accountManager = shallow(
      <AccountManager isInitialized user={{ displayName: testName }} />,
    );
    expect(accountManager.hasClass('AccountManager-Button')).toBeTruthy();
    expect(
      accountManager
        .find('.AccountManager-Dropdown')
        .dive()
        .text()
        .startsWith(testName),
    ).toEqual(true);
  });

  it('should not render an open dropdown if the dropdown is not active', () => {
    const accountManager = shallow(<AccountManager isInitialized user={{}} />);
    expect(
      accountManager
        .find('.AccountManager-Dropdown')
        .hasClass('AccountManager-Dropdown--active'),
    ).toBeFalsy();
  });

  it('should render an open dropdown if the dropdown is active', () => {
    const accountManager = shallow(
      <AccountManager isInitialized user={{}} isDropdownActive />,
    );
    expect(
      accountManager
        .find('.AccountManager-Dropdown')
        .hasClass('AccountManager-Dropdown--active'),
    ).toBeTruthy();
  });

  it('should open dropdown if the user button is clicked', () => {
    const openUserDropdown = jest.fn();
    const accountManager = shallow(
      <AccountManager
        isInitialized
        user={{}}
        openUserDropdown={openUserDropdown}
      />,
    );
    accountManager.find('.AccountManager-Dropdown').simulate('click');
    expect(openUserDropdown).toHaveBeenCalledTimes(1);
  });

  it('should close dropdown if it is already open and the button is clicked', () => {
    const closeUserDropdown = jest.fn();
    const accountManager = shallow(
      <AccountManager
        isInitialized
        isDropdownActive
        user={{}}
        closeUserDropdown={closeUserDropdown}
      />,
    );
    accountManager.find('.AccountManager-Dropdown').simulate('click');
    expect(closeUserDropdown).toHaveBeenCalledTimes(1);
  });

  it('should open profile edit if that option is clicked in the dropdown', () => {
    const openEditModal = jest.fn();
    const accountManager = shallow(
      <AccountManager
        isInitialized
        isDropdownActive
        user={{}}
        openEditModal={openEditModal}
      />,
    );
    accountManager
      .find('.AccountManager-Menu')
      .childAt(0)
      .simulate('click');
    expect(openEditModal).toHaveBeenCalledTimes(1);
  });

  it('should logout if that option is clicked in the dropdown', () => {
    const logout = jest.fn();
    const accountManager = shallow(
      <AccountManager
        isInitialized
        isDropdownActive
        user={{}}
        logout={logout}
      />,
    );
    accountManager
      .find('.AccountManager-Menu')
      .childAt(1)
      .simulate('click');
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
