import UserReducers, { initialState } from '../user.reducers';
import {
  INITIALIZE,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_EDIT_MODAL,
  CLOSE_EDIT_MODAL,
  UPDATE_USER_FORM,
  UPDATE_USER,
  LOGGED_IN,
  LOGGED_OUT,
  OPEN_USER_DROPDOWN,
  CLOSE_USER_DROPDOWN,
  AUTH_FAILURE,
} from '../../actions/user.actions';

describe('User Reducers', () => {
  test('should setup the initial state on construction', () => {
    const state = UserReducers(undefined, {});
    expect(state.isInitialized).toBeFalsy();
    expect(state.isDropdownActive).toBeFalsy();
    expect(state.isLoginModalOpen).toBeFalsy();
    expect(state.isEditModalOpen).toBeFalsy();
    expect(state.error).toEqual(null);
    expect(state.model).toEqual(null);
    expect(state.form).toBeDefined();
    expect(state.form.email).toEqual('');
    expect(state.form.password).toEqual('');
    expect(state.form.confirm).toEqual('');
    expect(state.form.displayName).toEqual('');
  });

  describe('INITIALIZE', () => {
    test('should initialize with user', () => {
      const testKey = 'key';
      const testValue = 'value';
      const state = UserReducers(undefined, {
        type: INITIALIZE,
        user: { [testKey]: testValue },
      });
      expect(state.model[testKey]).toEqual(testValue);
    });

    test('should set modal state after initialize', () => {
      const state = UserReducers(
        { ...initialState, isLoginModalOpen: true },
        {
          type: INITIALIZE,
          user: {},
        },
      );
      expect(state.isLoginModalOpen).toBeFalsy();
      expect(state.isInitialized).toBeTruthy();
    });

    test('should set display name when initializing a logged in user', () => {
      const testName = 'value';
      const state = UserReducers(undefined, {
        type: INITIALIZE,
        user: { displayName: testName },
      });
      expect(state.model.displayName).toEqual(testName);
      expect(state.form.displayName).toEqual(testName);
    });

    test('should set displayName in form to an empty string even if user is not defined on action', () => {
      const state = UserReducers(undefined, {
        type: INITIALIZE,
      });
      expect(state.form.displayName).toEqual(undefined);
    });
  });

  describe('OPEN_LOGIN_MODAL', () => {
    test('should set login modal to open', () => {
      const state = UserReducers(initialState, {
        type: OPEN_LOGIN_MODAL,
      });
      expect(state.isLoginModalOpen).toBeTruthy();
    });
  });

  describe('CLOSE_LOGIN_MODAL', () => {
    test('should set login modal to closed', () => {
      const state = UserReducers(
        { ...initialState, isLoginModalOpen: true, error: {} },
        {
          type: CLOSE_LOGIN_MODAL,
        },
      );
      expect(state.isLoginModalOpen).toBeFalsy();
      expect(state.error).toEqual(null);
    });
  });

  describe('OPEN_EDIT_MODAL', () => {
    test('should open edit modal', () => {
      const state = UserReducers(initialState, {
        type: OPEN_EDIT_MODAL,
      });
      expect(state.isEditModalOpen).toBeTruthy();
    });

    test('should set dropdown to inactive', () => {
      const state = UserReducers(
        { ...initialState, isDropdownActive: true },
        {
          type: OPEN_EDIT_MODAL,
        },
      );
      expect(state.isDropdownActive).toBeFalsy();
    });
  });

  describe('CLOSE_EDIT_MODAL', () => {
    test('should set login modal to closed', () => {
      const state = UserReducers(
        { ...initialState, isEditModalOpen: true, error: {} },
        {
          type: CLOSE_EDIT_MODAL,
        },
      );
      expect(state.isEditModalOpen).toBeFalsy();
      expect(state.error).toEqual(null);
    });
  });

  describe('UPDATE_USER_FORM', () => {
    test('should set form based on key and value', () => {
      const testKey = 'email';
      const testValue = 'test@test.com';
      const state = UserReducers(initialState, {
        type: UPDATE_USER_FORM,
        key: testKey,
        value: testValue,
      });
      expect(state.form[testKey]).toEqual(testValue);
    });
  });

  describe('UPDATE_USER', () => {
    test('should set the user model', () => {
      const testDisplayName = 'test';
      const state = UserReducers(initialState, {
        type: UPDATE_USER,
        user: { displayName: testDisplayName },
      });
      expect(state.model.displayName).toEqual(testDisplayName);
    });

    test('should keep existing model values', () => {
      const testDisplayName = 'test';
      const state = UserReducers(
        { ...initialState, model: { displayName: testDisplayName } },
        {
          type: UPDATE_USER,
          user: {},
        },
      );
      expect(state.model.displayName).toEqual(testDisplayName);
    });

    test('should close the edit modal', () => {
      const state = UserReducers(
        { ...initialState, isEditModalOpen: true },
        {
          type: UPDATE_USER,
          user: {},
        },
      );
      expect(state.isEditModalOpen).toBeFalsy();
    });
  });

  describe('LOGGED_IN', () => {
    test('should set the user', () => {
      const testDisplayName = 'test';
      const state = UserReducers(initialState, {
        type: LOGGED_IN,
        user: { displayName: testDisplayName },
      });
      expect(state.model.displayName).toEqual(testDisplayName);
    });

    test('should close the login modal', () => {
      const state = UserReducers(
        { ...initialState, isLoginModalOpen: true },
        {
          type: LOGGED_IN,
          user: {},
        },
      );
      expect(state.isLoginModalOpen).toBeFalsy();
    });
  });

  describe('LOGGED_OUT', () => {
    test('should close the login modal', () => {
      const state = UserReducers(
        { ...initialState, isLoginModalOpen: true },
        { type: LOGGED_OUT },
      );
      expect(state.isLoginModalOpen).toBeFalsy();
    });

    test('should close the dropdown', () => {
      const state = UserReducers(
        { ...initialState, isDropdownActive: true },
        { type: LOGGED_OUT },
      );
      expect(state.isDropdownActive).toBeFalsy();
    });

    test('should clear the user model', () => {
      const state = UserReducers(
        { ...initialState, model: {} },
        { type: LOGGED_OUT },
      );
      expect(state.model).toEqual(null);
    });
  });

  describe('OPEN_USER_DROPDOWN', () => {
    test('should set login modal to open', () => {
      const state = UserReducers(initialState, {
        type: OPEN_USER_DROPDOWN,
      });
      expect(state.isDropdownActive).toBeTruthy();
    });
  });

  describe('CLOSE_USER_DROPDOWN', () => {
    test('should set login modal to closed', () => {
      const state = UserReducers(
        { ...initialState, isDropdownActive: true },
        {
          type: CLOSE_USER_DROPDOWN,
        },
      );
      expect(state.isDropdownActive).toBeFalsy();
    });
  });

  describe('AUTH_FAILURE', () => {
    test('should set the default error message', () => {
      const state = UserReducers(initialState, { type: AUTH_FAILURE });
      expect(state.error).toEqual('There has been an error. Please try again.');
    });

    test('should set a custom error message', () => {
      const customError = 'error';
      const state = UserReducers(initialState, {
        type: AUTH_FAILURE,
        error: customError,
      });
      expect(state.error).toEqual(customError);
    });
  });
});
