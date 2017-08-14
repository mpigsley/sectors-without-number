import { connect } from 'react-redux';

import { getCurrentSector } from 'store/selectors/sector.selectors';
import Sector from './sector';

const mapStateToProps = state => ({
  renderSector: state.sector.renderSector,
  sector: getCurrentSector(state),
  holdKey: state.sector.holdKey,
});

export default connect(mapStateToProps)(Sector);
