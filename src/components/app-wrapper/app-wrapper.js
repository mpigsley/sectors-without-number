import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import { IntlProvider } from 'react-intl';

import InitWrapper from 'components/init-wrapper';
import LoginModal from 'components/login-modal';
import SectorSyncModal from 'components/sector-sync-modal';
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
};
