import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import { IntlProvider } from 'react-intl';

import LoginModal from 'components/login-modal';
import Modal from 'primitives/modal/modal';

export default function AppWrapper({
  children,
  isSyncModalOpen,
  closeSyncModal,
  locale,
}) {
  return (
    <IntlProvider locale={locale}>
      <Fragment>
        <ReduxToastr position="bottom-left" newestOnTop={false} progressBar />
        <LoginModal />
        <Modal
          isOpen={isSyncModalOpen}
          title="Sectors Synced"
          cancelText="Continue"
          onCancel={closeSyncModal}
        >
          You&#39;re sector(s) have been synced. You can now share them with
          your friends.
        </Modal>
        {children}
      </Fragment>
    </IntlProvider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isSyncModalOpen: PropTypes.bool.isRequired,
  closeSyncModal: PropTypes.func.isRequired,
  locale: PropTypes.string,
};

AppWrapper.defaultProps = {
  locale: 'en',
};
