import { connect } from 'react-redux';

import { closeUserDropdown } from 'store/actions/user.actions';

import HexBackground from './hex-background';

const mapStateToProps = state => ({
  isDropdownActive: state.user.isDropdownActive,
});

export default connect(mapStateToProps, { closeUserDropdown })(HexBackground);
