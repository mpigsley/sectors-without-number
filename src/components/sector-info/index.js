import { connect } from 'react-redux';

import { getCurrentSector } from 'store/selectors/sector.selectors';
import { editSector, deleteSector } from 'store/actions/sector.actions';
import { editSystem } from 'store/actions/system.actions';
import SectorInfo from './sector-info';

const mapStateToProps = state => {
  const sector = getCurrentSector(state);
  return {
    isCloudSave: !!sector.isCloudSave,
    isSaved: !state.sector.generated,
    sector,
  };
};

const mapDispatchToProps = dispatch => ({
  editSectorName: value => dispatch(editSector('name', value)),
  deleteSector: key => dispatch(deleteSector(key)),
  editSystem: system => dispatch(editSystem(system.key, system)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectorInfo);
