import { connect } from 'react-redux';

import { getCurrentSector } from 'store/selectors/sector.selectors';
import PrintableSector from './printable-sector';

const mapStateToProps = state => ({
  systems: getCurrentSector(state).systems,
});

export default connect(mapStateToProps)(PrintableSector);
