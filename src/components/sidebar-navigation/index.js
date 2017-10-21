import { connect } from 'react-redux';

import { getCurrentSector } from 'store/selectors/sector.selectors';
import { saveSector } from 'store/actions/sector.actions';
import SidebarNavigation, { SidebarType } from './sidebar-navigation';

const mapStateToProps = state => ({
  isSaved: !state.sector.generated,
  isSynced: !!state.user.model,
  isCloudSave: !!getCurrentSector(state).isCloudSave,
});

const mapDispatchToProps = dispatch => ({
  saveSector() {
    dispatch(saveSector());
  },
});

export { SidebarType };
export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavigation);
