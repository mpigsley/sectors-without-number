import { actions as ReduxToastrActions } from 'react-redux-toastr';

import { SuccessToast, ErrorToast } from '../toasts';

jest.mock('react-redux-toastr', () => ({
  actions: {
    add: jest.fn(data => data),
  },
}));

jest.mock('../../store/api/firebase', () => ({
  uploadSector: jest.fn(() => Promise.resolve()),
}));

describe('Store Utils', () => {
  describe('SuccessToast', () => {
    beforeEach(() => {
      ReduxToastrActions.add.mockClear();
    });

    test('should call the toastr action builder', () => {
      SuccessToast();
      expect(ReduxToastrActions.add).toHaveBeenCalledTimes(1);
    });

    test('should have correct option', () => {
      const { options } = SuccessToast();
      expect(options).toMatchObject({
        removeOnHover: true,
        showCloseButton: true,
      });
    });

    test('should have correct position', () => {
      const { position } = SuccessToast();
      expect(position).toEqual('bottom-left');
    });

    test('should be a success toast', () => {
      const { type } = SuccessToast();
      expect(type).toEqual('success');
    });

    test('should allow overriding title and message', () => {
      const testTitle = 'asdf';
      const testMessage = 'fdsa';
      const { title, message } = SuccessToast({
        title: testTitle,
        message: testMessage,
      });
      expect(title).toEqual(testTitle);
      expect(message).toEqual(testMessage);
    });
  });

  describe('ErrorToast', () => {
    beforeEach(() => {
      ReduxToastrActions.add.mockClear();
    });

    test('should call the toastr action builder', () => {
      ErrorToast();
      expect(ReduxToastrActions.add).toHaveBeenCalledTimes(1);
    });

    test('should have correct option', () => {
      const { options } = ErrorToast();
      expect(options).toMatchObject({
        removeOnHover: true,
        showCloseButton: true,
      });
    });

    test('should have correct position', () => {
      const { position } = ErrorToast();
      expect(position).toEqual('bottom-left');
    });

    test('should be a success toast', () => {
      const { type } = ErrorToast();
      expect(type).toEqual('error');
    });
  });
});
