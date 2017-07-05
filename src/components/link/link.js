import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isExternal from 'is-url-external';

/**
 * Link that also works for external URL's
 */
export default class LinkDuo extends Component {
  render() {
    return isExternal(this.props.to) ?
      <a
        href={this.props.to}
        {...this.props}
      />
      :
      <Link {...this.props} />;
  }
}

LinkDuo.propTypes = {
  to: PropTypes.string.isRequired,
};
