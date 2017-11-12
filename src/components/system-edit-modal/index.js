import { connect } from 'react-redux';

import { getPlanetKeys } from 'store/selectors/planet.selectors';
import { getCurrentSector } from 'store/selectors/sector.selectors';
import { getEmptySystemKeys } from 'store/selectors/system.selectors';

import SystemEditModal from './system-edit-modal';

const mapStateToProps = (state, props) => {
  const sector = getCurrentSector(state);
  return {
    planetKeys: getPlanetKeys(state, props),
    system: sector.systems[props.systemKey],
    emptySystemKeys: getEmptySystemKeys(state),
  };
};

export default connect(mapStateToProps)(SystemEditModal);
