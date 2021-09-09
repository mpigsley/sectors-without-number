import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import { IntlProvider } from 'react-intl';

import LoginModal from 'components/login-modal';
import CustomTagModal from 'components/custom-tag-modal';

export default function AppWrapper({ children, userLocale, locale, location }) {
  return (
    <IntlProvider locale={userLocale} messages={locale}>
      <>
        <ReduxToastr position="bottom-left" newestOnTop={false} progressBar />
        <LoginModal />
        <CustomTagModal />
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { location }),
        )}
      </>
    </IntlProvider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  userLocale: PropTypes.string.isRequired,
  locale: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};
