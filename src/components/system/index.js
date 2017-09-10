import { connect } from 'react-redux';

import {
  systemHoverStart,
  systemHoverEnd,
  systemHold,
  systemRelease,
  moveSystem,
} from 'store/actions/system.actions';
import System from './system';

const mapStateToProps = ({ system }) => ({
  holdKey: system.holdKey,
  hoverKey: system.hoverKey,
});

const mapDispatchToProps = dispatch => ({
  systemHoverStart: key => {
    dispatch(systemHoverStart(key));
  },
  systemHoverEnd: key => {
    dispatch(systemHoverEnd(key));
  },
  systemHold: key => {
    dispatch(systemHold(key));
  },
  systemRelease: () => {
    dispatch(systemRelease());
  },
  moveSystem: () => {
    dispatch(moveSystem());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(System);
