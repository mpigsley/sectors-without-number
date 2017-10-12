import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

import LoginModal from 'primitives/modal/login-modal';

export default function AppWrapper({ children }) {
  return (
    <div>
      <ReduxToastr position="bottom-left" newestOnTop={false} progressBar />
      <LoginModal />
      {children}
    </div>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
