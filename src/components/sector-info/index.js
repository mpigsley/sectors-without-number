import { connect } from 'react-redux';

import { getCurrentSector } from 'store/selectors/sector.selectors';
import SectorInfo from './sector-info';

const mapStateToProps = state => ({
  sector: getCurrentSector(state),
});

export default connect(mapStateToProps)(SectorInfo);
