import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import { IntlProvider } from 'react-intl';

import LoginModal from 'components/login-modal';
import Modal from 'primitives/modal/modal';
import Lang from 'lang';

export default function AppWrapper({
  children,
  isSyncModalOpen,
  closeSyncModal,
  userLocale,
}) {
  return (
    <IntlProvider
      locale={userLocale}
      messages={{ ...Lang.en, ...Lang[userLocale] }}
    >
      <div>
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
      </div>
    </IntlProvider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isSyncModalOpen: PropTypes.bool.isRequired,
  closeSyncModal: PropTypes.func.isRequired,
  userLocale: PropTypes.string.isRequired,
};
