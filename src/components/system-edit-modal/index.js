import { connect } from 'react-redux';

import { getPlanetKeys } from 'store/selectors/planet.selectors';
import {
  getCurrentSystems,
  getEmptySystemKeys,
} from 'store/selectors/system.selectors';

import SystemEditModal from './system-edit-modal';

const mapStateToProps = (state, props) => ({
  planetKeys: getPlanetKeys(state, props),
  system: getCurrentSystems(state)[props.hexKey],
  emptySystemKeys: getEmptySystemKeys(state),
});

export default connect(mapStateToProps)(SystemEditModal);
