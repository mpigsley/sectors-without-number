import { connect } from 'react-redux';

import { saveSector } from 'store/actions/sector.actions';
import { openLoginModal } from 'store/actions/user.actions';
import SidebarNavigation, { SidebarType } from './sidebar-navigation';

const mapStateToProps = ({ sector }) => ({
  currentSector: sector.currentSector,
});

const mapDispatchToProps = dispatch => ({
  saveSector() {
    dispatch(saveSector());
  },
  openLoginModal() {
    dispatch(openLoginModal());
  },
});

export { SidebarType };
export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavigation);
