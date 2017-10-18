import { connect } from 'react-redux';

import { closeUserDropdown } from 'store/actions/user.actions';

import HexBackground from './hex-background';

const mapStateToProps = state => ({
  isDropdownActive: state.user.isDropdownActive,
});

const mapDispatchToProps = dispatch => ({
  closeUserDropdown: () => dispatch(closeUserDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HexBackground);
