import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import { IntlProvider } from 'react-intl';

import InitWrapper from 'components/init-wrapper';
import LoginModal from 'components/login-modal';
import SectorSyncModal from 'components/sector-sync-modal';

export default function AppWrapper({
  children,
  isSyncModalOpen,
  closeSyncModal,
  userLocale,
  locale,
}) {
  return (
    <IntlProvider locale={userLocale} messages={locale}>
      <InitWrapper>
        <ReduxToastr position="bottom-left" newestOnTop={false} progressBar />
        <LoginModal />
        <SectorSyncModal isOpen={isSyncModalOpen} onCancel={closeSyncModal} />
        {children}
      </InitWrapper>
    </IntlProvider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isSyncModalOpen: PropTypes.bool.isRequired,
  closeSyncModal: PropTypes.func.isRequired,
  userLocale: PropTypes.string.isRequired,
  locale: PropTypes.shape().isRequired,
};
