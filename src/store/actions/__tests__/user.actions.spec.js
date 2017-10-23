import {
  initialize,
  login,
  facebookLogin,
  googleLogin,
  signup,
  updateUser,
  logout,
  AUTH_FAILURE,
  LOGGED_OUT,
} from '../user.actions';
import {
  getSyncedSectors,
  uploadSector,
  updateCurrentUser,
  doLogout,
} from '../../api/firebase';

const UID = 'uid';

jest.mock('../../api/firebase', () => {
  const promiseMock = jest.fn((data = {}) => Promise.resolve(data));
  const userMock = jest.fn(() =>
    Promise.resolve({
      uid: 'uid',
      toJSON: () => ({ uid: 'uid' }),
      sendEmailVerification: () => {},
    }),
  );
  return {
    doSignup: userMock,
    doLogin: userMock,
    doFacebookLogin: userMock,
    doGoogleLogin: userMock,
    doLogout: promiseMock,
    getSyncedSectors: promiseMock,
    updateCurrentUser: promiseMock,
    uploadSector: jest.fn((sector = {}, uid = 'uid') => ({
      ...sector,
      creator: uid,
    })),
  };
});

jest.mock('../../api/local', () => ({
  clearLocalDatabase: jest.fn(),
}));

describe('User Actions', () => {
  let dispatchedActions;
  let dispatch;

  beforeEach(() => {
    dispatchedActions = [];
    dispatch = jest.fn(actionData => dispatchedActions.push(actionData));
    getSyncedSectors.mockClear();
    uploadSector.mockClear();
    console.error = jest.fn();
  });

  const formTests = func => {
    test('should dispatch error if email does not exist', () => {
      const getState = () => ({
        user: { form: { password: 'asdf', email: '' } },
      });
      func()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatchedActions[0]).toMatchObject({
        type: AUTH_FAILURE,
        error: 'Email and password are required.',
      });
    });

    test('should dispatch error if password does not exist', () => {
      const getState = () => ({
        user: { form: { password: '', email: 'asdf' } },
      });
      func()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatchedActions[0]).toMatchObject({
        type: AUTH_FAILURE,
        error: 'Email and password are required.',
      });
    });

    test('should dispatch error if both email and password do not exist', () => {
      const getState = () => ({
        user: { form: { password: '', email: '' } },
      });
      func()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatchedActions[0]).toMatchObject({
        type: AUTH_FAILURE,
        error: 'Email and password are required.',
      });
    });
  };

  const onLoginTests = func => {
    test('should redirect me home on successful login', () => {
      expect.assertions(2);
      const getState = () => ({
        user: { form: { password: 'asdf', email: 'asdf', confirm: 'asdf' } },
        sector: { saved: {} },
      });
      return func()(dispatch, getState).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatchedActions[0]).toMatchObject({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/'] },
        });
      });
    });

    test('should log me in with references to user model and sectors', () => {
      expect.assertions(3);
      const sectorKey = 'asdf';
      getSyncedSectors.mockImplementation(() =>
        Promise.resolve({ [sectorKey]: {} }),
      );
      const getState = () => ({
        user: { form: { password: 'asdf', email: 'asdf', confirm: 'asdf' } },
        sector: { saved: {} },
      });
      return func()(dispatch, getState).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatchedActions[1].sectors[sectorKey]).toBeDefined();
        expect(dispatchedActions[1].user.uid).toEqual(UID);
      });
    });

    test('should sync any local sectors and return the combined sector list', () => {
      expect.assertions(5);
      const syncedSectorKey = 'synced';
      getSyncedSectors.mockImplementation(() =>
        Promise.resolve({ [syncedSectorKey]: { key: syncedSectorKey } }),
      );
      const localSectorKey = 'local';
      const getState = () => ({
        user: { form: { password: 'asdf', email: 'asdf', confirm: 'asdf' } },
        sector: { saved: { [localSectorKey]: { key: localSectorKey } } },
      });
      return func()(dispatch, getState).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(uploadSector).toHaveBeenCalledTimes(1);
        expect(Object.keys(dispatchedActions[1].sectors)).toHaveLength(2);
        expect(Object.keys(dispatchedActions[1].sectors)).toContain(
          syncedSectorKey,
        );
        expect(Object.keys(dispatchedActions[1].sectors)).toContain(
          localSectorKey,
        );
      });
    });

    test('should filter out any sectors that are not owned by the user', () => {
      expect.assertions(4);
      const syncedSectorKey = 'synced';
      getSyncedSectors.mockImplementation(() =>
        Promise.resolve({ [syncedSectorKey]: { key: syncedSectorKey } }),
      );
      const localSectorKey = 'local';
      const getState = () => ({
        user: { form: { password: 'asdf', email: 'asdf', confirm: 'asdf' } },
        sector: {
          saved: {
            [localSectorKey]: { key: localSectorKey, isCloudSave: true },
          },
        },
      });
      return func()(dispatch, getState).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(uploadSector).toHaveBeenCalledTimes(0);
        expect(Object.keys(dispatchedActions[1].sectors)).toHaveLength(1);
        expect(Object.keys(dispatchedActions[1].sectors)).toContain(
          syncedSectorKey,
        );
      });
    });
  };

  describe('initialize', () => {
    test('should dispatch local sectors if user is not logged in', () => {
      expect.assertions(3);
      const localSectorKey = 'local';
      return initialize({ local: { [localSectorKey]: {} } })(
        dispatch,
      ).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(Object.keys(dispatchedActions[0].sectors)).toHaveLength(1);
        expect(dispatchedActions[0].sectors[localSectorKey]).toBeDefined();
      });
    });

    test('should dispatch synced sectors if user is logged in and has no local sectors', () => {
      expect.assertions(3);
      const syncedSectorKey = 'synced';
      return initialize({ synced: { [syncedSectorKey]: {} }, user: {} })(
        dispatch,
      ).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(Object.keys(dispatchedActions[0].sectors)).toHaveLength(1);
        expect(dispatchedActions[0].sectors[syncedSectorKey]).toBeDefined();
      });
    });

    test('should upload any local sectors if user is logged in', () => {
      expect.assertions(4);
      const localSectorKey = 'local';
      return initialize({
        local: { [localSectorKey]: { key: localSectorKey } },
        user: {},
      })(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(uploadSector).toHaveBeenCalledTimes(1);
        expect(Object.keys(dispatchedActions[0].sectors)).toHaveLength(1);
        expect(dispatchedActions[0].sectors[localSectorKey]).toBeDefined();
      });
    });

    test('should combine local and synced sectors if user is logged in', () => {
      expect.assertions(5);
      const localSectorKey = 'local';
      const syncedSectorKey = 'synced';
      return initialize({
        local: { [localSectorKey]: { key: localSectorKey } },
        synced: { [syncedSectorKey]: { key: syncedSectorKey } },
        user: {},
      })(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(uploadSector).toHaveBeenCalledTimes(1);
        expect(Object.keys(dispatchedActions[0].sectors)).toHaveLength(2);
        expect(dispatchedActions[0].sectors[localSectorKey]).toBeDefined();
        expect(dispatchedActions[0].sectors[syncedSectorKey]).toBeDefined();
      });
    });

    test('should add `isCloudSave` if a current sector is given', () => {
      expect.assertions(4);
      const currentSectorKey = 'current';
      return initialize({
        currentSector: { key: currentSectorKey },
      })(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(Object.keys(dispatchedActions[0].sectors)).toHaveLength(1);
        expect(dispatchedActions[0].sectors[currentSectorKey]).toBeDefined();
        expect(
          dispatchedActions[0].sectors[currentSectorKey].isCloudSave,
        ).toBeTruthy();
      });
    });
  });

  describe('signup', () => {
    formTests(signup);

    test('should dispatch error if password and confirmation are not equal', () => {
      const getState = () => ({
        user: { form: { password: 'asdf', email: 'asdf', confirm: 'fdsa' } },
      });
      signup()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatchedActions[0]).toMatchObject({
        type: AUTH_FAILURE,
        error: 'Passwords do not match.',
      });
    });

    onLoginTests(signup);
  });

  describe('login', () => {
    formTests(login);
    onLoginTests(login);
  });

  describe('facebookLogin', () => {
    onLoginTests(facebookLogin);
  });

  describe('googleLogin', () => {
    onLoginTests(googleLogin);
  });

  describe('updateUser', () => {
    test('should set the display name and dispatch the change', () => {
      expect.assertions(3);
      const testName = 'testName';
      const getState = () => ({
        user: { form: { displayName: testName } },
      });
      return updateUser()(dispatch, getState).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(updateCurrentUser).toHaveBeenCalledTimes(1);
        expect(dispatchedActions[0].user.displayName).toEqual(testName);
      });
    });

    test('should dispatch error toast when a service failure occurs', () => {
      expect.assertions(2);
      updateCurrentUser.mockImplementation(() => Promise.reject());
      const getState = () => ({
        user: { form: { displayName: '' } },
      });
      return updateUser()(dispatch, getState).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatchedActions[0]).toMatchObject({
          payload: {
            message: 'Report a problem if it persists.',
            options: { removeOnHover: true, showCloseButton: true },
            position: 'bottom-left',
            title: 'There has been an error',
            type: 'error',
          },
          type: '@ReduxToastr/toastr/ADD',
        });
        updateCurrentUser.mockImplementation(
          jest.fn((data = {}) => Promise.resolve(data)),
        );
      });
    });
  });

  describe('logout', () => {
    test('should redirect me home', () => {
      expect.assertions(2);
      return logout()(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatchedActions[0]).toMatchObject({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/'] },
        });
      });
    });

    test('should dispatch logged out action', () => {
      expect.assertions(2);
      return logout()(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatchedActions[1].type).toEqual(LOGGED_OUT);
      });
    });

    test('should dispatch error toast when a service failure occurs', () => {
      expect.assertions(2);
      doLogout.mockImplementation(() => Promise.reject());
      return logout()(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatchedActions[0]).toMatchObject({
          payload: {
            message: 'Report a problem if it persists.',
            options: { removeOnHover: true, showCloseButton: true },
            position: 'bottom-left',
            title: 'There has been an error',
            type: 'error',
          },
          type: '@ReduxToastr/toastr/ADD',
        });
        doLogout.mockImplementation(
          jest.fn((data = {}) => Promise.resolve(data)),
        );
      });
    });
  });
});
