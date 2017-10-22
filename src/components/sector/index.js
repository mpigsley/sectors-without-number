import { connect } from 'react-redux';

import { editSystem, closeSystemCreate } from 'store/actions/system.actions';
import { getCurrentSector } from 'store/selectors/sector.selectors';
import { closeUserDropdown } from 'store/actions/user.actions';
import Sector from './sector';

const mapStateToProps = state => ({
  renderSector: state.sector.renderSector,
  sector: getCurrentSector(state),
  createSystemKey: state.system.createSystemKey,
  isDropdownActive: state.user.isDropdownActive,
  isInitialized: state.user.isInitialized,
});

const mapDispatchToProps = dispatch => ({
  editSystem: (system, changes) => dispatch(editSystem(system, changes)),
  closeSystemCreate: () => dispatch(closeSystemCreate()),
  closeUserDropdown: () => dispatch(closeUserDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sector);
