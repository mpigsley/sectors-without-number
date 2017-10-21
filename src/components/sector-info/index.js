import { connect } from 'react-redux';

import { getCurrentSector } from 'store/selectors/sector.selectors';
import { editSector, deleteSector } from 'store/actions/sector.actions';
import SectorInfo from './sector-info';

const mapStateToProps = state => ({
  sector: getCurrentSector(state),
  isSaved: !state.sector.generated,
});

const mapDispatchToProps = dispatch => ({
  editSectorName: value => {
    dispatch(editSector('name', value));
  },
  deleteSector: key => {
    dispatch(deleteSector(key));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SectorInfo);
