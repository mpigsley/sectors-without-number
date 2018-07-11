import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import { IntlProvider } from 'react-intl';

import InitWrapper from 'components/init-wrapper';
import LoginModal from 'components/login-modal';

export default function AppWrapper({ children, userLocale, locale, location }) {
  return (
    <IntlProvider locale={userLocale} messages={locale}>
      <InitWrapper>
        <ReduxToastr position="bottom-left" newestOnTop={false} progressBar />
        <LoginModal />
        {React.Children.map(children, child =>
          React.cloneElement(child, { location }),
        )}
      </InitWrapper>
    </IntlProvider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  userLocale: PropTypes.string.isRequired,
  locale: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};
