import { connect } from 'react-redux';

import {
  sectorHoverStart,
  sectorHoverEnd,
  systemHold,
  systemRelease,
} from 'store/actions/sector.actions';
import System from './system';

const mapStateToProps = ({ sector }) => ({
  holdKey: sector.holdKey,
  hoverKey: sector.hoverKey,
});

const mapDispatchToProps = dispatch => ({
  sectorHoverStart: key => {
    dispatch(sectorHoverStart(key));
  },
  sectorHoverEnd: key => {
    dispatch(sectorHoverEnd(key));
  },
  systemHold: key => {
    dispatch(systemHold(key));
  },
  systemRelease: () => {
    dispatch(systemRelease());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(System);
