import { connect } from 'react-redux';

import { getCurrentSystems } from 'store/selectors/system.selectors';
import { getCurrentPlanets } from 'store/selectors/planet.selectors';
import PrintableSector from './printable-sector';

const mapStateToProps = state => ({
  systems: getCurrentSystems(state),
  planets: getCurrentPlanets(state),
});

export default connect(mapStateToProps)(PrintableSector);
