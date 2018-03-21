import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InitWrapper extends Component {
  componentWillMount() {
    this.props.initialize(this.props.location);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

InitWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  initialize: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
