import { Component } from 'react';
import PropTypes from 'prop-types';

export default class InitWrapper extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    initialize: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    props.initialize(props.location);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
