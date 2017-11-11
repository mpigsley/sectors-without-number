import { connect } from 'react-redux';

import { getPlanetKeys } from 'store/selectors/planet.selectors';
import { getCurrentSector } from 'store/selectors/sector.selectors';

import SystemEditModal from './system-edit-modal';

const mapStateToProps = (state, props) => {
  const sector = getCurrentSector(state);
  const system = sector.systems[props.systemKey];
  return { planetKeys: getPlanetKeys(state, props), system };
};

export default connect(mapStateToProps)(SystemEditModal);
