import { connect } from 'react-redux';

import { getCurrentEntities } from 'store/selectors/entity.selectors';
import Entities from 'constants/entities';
import PrintableSector from './printable-sector';

const mapStateToProps = state => {
  const entities = getCurrentEntities(state);
  return {
    systems: entities[Entities.system.key],
    planets: entities[Entities.planet.key],
  };
};

export default connect(mapStateToProps)(PrintableSector);
