import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

export default function AppWrapper({ children }) {
  return (
    <div>
      <ReduxToastr position="bottom-left" newestOnTop={false} progressBar />
      {children}
    </div>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
