import React from 'react';
import { shallow } from 'enzyme';

import LoginModal from '../login-modal/login-modal';

const defaultProps = {
  isLoginModalOpen: false,
  closeLoginModal: () => {},
  updateUserForm: () => {},
  facebookLogin: () => {},
  googleLogin: () => {},
  signup: () => {},
  login: () => {},
  passwordReset: () => {},
  email: '',
  password: '',
  confirm: '',
};

describe('LoginModal', () => {
  it('should close login modal if you hit the x', () => {
    const closeLoginModal = jest.fn();
    const loginModal = shallow(
      <LoginModal {...defaultProps} closeLoginModal={closeLoginModal} />,
    );
    loginModal.find('.LoginModal-Close').simulate('click');
    expect(closeLoginModal).toHaveBeenCalledTimes(1);
  });

  it('should login with facebook if the facebook button is clicked', () => {
    const facebookLogin = jest.fn();
    const loginModal = shallow(
      <LoginModal {...defaultProps} facebookLogin={facebookLogin} />,
    );
    loginModal.find('.LoginModal-Facebook').simulate('click');
    expect(facebookLogin).toHaveBeenCalledTimes(1);
  });

  it('should login with google if the google button is clicked', () => {
    const googleLogin = jest.fn();
    const loginModal = shallow(
      <LoginModal {...defaultProps} googleLogin={googleLogin} />,
    );
    loginModal.find('.LoginModal-Google').simulate('click');
    expect(googleLogin).toHaveBeenCalledTimes(1);
  });

  it('should default to the login page', () => {
    const loginModal = shallow(<LoginModal {...defaultProps} />);
    expect(
      loginModal
        .find('.LoginModal-Switcher')
        .childAt(0)
        .hasClass('LoginModal-SwitchButton--active'),
    ).toEqual(true);
    expect(
      loginModal
        .find('.LoginModal-Switcher')
        .childAt(1)
        .hasClass('LoginModal-SwitchButton--active'),
    ).toEqual(false);
    expect(loginModal.find('#email').exists()).toEqual(true);
    expect(loginModal.find('#password').exists()).toEqual(true);
    expect(loginModal.find('#confirm').exists()).toEqual(false);
    expect(
      loginModal
        .find('.LoginModal-Submit')
        .childAt(0)
        .dive()
        .text(),
    ).toEqual('Log in');
  });

  it('should switch to the signup page if clicked', () => {
    const loginModal = shallow(<LoginModal {...defaultProps} />);
    loginModal
      .find('.LoginModal-Switcher')
      .childAt(1)
      .simulate('click');
    expect(
      loginModal
        .find('.LoginModal-Switcher')
        .childAt(0)
        .hasClass('LoginModal-SwitchButton--active'),
    ).toEqual(false);
    expect(
      loginModal
        .find('.LoginModal-Switcher')
        .childAt(1)
        .hasClass('LoginModal-SwitchButton--active'),
    ).toEqual(true);
    expect(loginModal.find('#email').exists()).toEqual(true);
    expect(loginModal.find('#password').exists()).toEqual(true);
    expect(loginModal.find('#confirm').exists()).toEqual(true);
    expect(
      loginModal
        .find('.LoginModal-Submit')
        .childAt(0)
        .dive()
        .text(),
    ).toEqual('Sign up');
  });

  it('should render forgot password if clicked', () => {
    const loginModal = shallow(<LoginModal {...defaultProps} />);
    loginModal
      .find('.LoginModal-Forgot')
      .childAt(0)
      .simulate('click');
    expect(
      loginModal
        .find('.LoginModal-Switcher')
        .childAt(0)
        .hasClass('LoginModal-SwitchButton--active'),
    ).toEqual(false);
    expect(
      loginModal
        .find('.LoginModal-Switcher')
        .childAt(1)
        .hasClass('LoginModal-SwitchButton--active'),
    ).toEqual(false);
    expect(loginModal.find('#email').exists()).toEqual(true);
    expect(loginModal.find('#password').exists()).toEqual(false);
    expect(loginModal.find('#confirm').exists()).toEqual(false);
    expect(
      loginModal
        .find('.LoginModal-Submit')
        .childAt(0)
        .dive()
        .text(),
    ).toEqual('Send Password Reset');
  });

  it('should render an error if an error has been given', () => {
    const testError = 'testError';
    const loginModal = shallow(
      <LoginModal {...defaultProps} error={testError} />,
    );
    expect(loginModal.find('.LoginModal-Error').exists()).toEqual(true);
    expect(
      loginModal
        .find('.LoginModal-Error')
        .children()
        .text(),
    ).toEqual(testError);
  });
});
