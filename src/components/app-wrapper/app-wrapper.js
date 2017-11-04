import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

import LoginModal from 'components/login-modal';
import Modal from 'primitives/modal/modal';

export default function AppWrapper({
  children,
  isSyncModalOpen,
  closeSyncModal,
}) {
  return (
    <div>
      <ReduxToastr position="bottom-left" newestOnTop={false} progressBar />
      <LoginModal />
      <Modal
        isOpen={isSyncModalOpen}
        title="Sectors Synced"
        cancelText="Continue"
        onCancel={closeSyncModal}
      >
        You&#39;re sector(s) have been synced. You can now share them with your
        friends.
      </Modal>
      {children}
    </div>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isSyncModalOpen: PropTypes.bool.isRequired,
  closeSyncModal: PropTypes.func.isRequired,
};
