import { connect } from 'react-redux';

import { saveSector } from 'store/actions/sector.actions';
import SidebarNavigation, { SidebarType } from './sidebar-navigation';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  saveSector() {
    dispatch(saveSector());
  },
});

export { SidebarType };
export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavigation);
