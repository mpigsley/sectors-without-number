import { connect } from 'react-redux';

import {
  systemHoverStart,
  systemHoverEnd,
  systemHold,
  systemRelease,
  moveSystem,
  openSystemCreate,
} from 'store/actions/system.actions';
import { getCurrentSector } from 'store/selectors/sector.selectors';
import { getCurrentTopLevelEntities } from 'store/selectors/entity.selectors';

import Hex from './hex';

const mapStateToProps = state => ({
  topLevelEntities: getCurrentTopLevelEntities(state),
  holdKey: state.system.holdKey,
  hoverKey: state.system.hoverKey,
  isCloudSave: !!(getCurrentSector(state) || {}).isCloudSave,
});

const mapDispatchToProps = dispatch => ({
  systemHoverStart: key => dispatch(systemHoverStart(key)),
  systemHoverEnd: key => dispatch(systemHoverEnd(key)),
  systemHold: key => dispatch(systemHold(key)),
  systemRelease: () => dispatch(systemRelease()),
  moveSystem: () => dispatch(moveSystem()),
  openSystemCreate: key => dispatch(openSystemCreate(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hex);
